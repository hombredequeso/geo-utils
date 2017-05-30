const commandLineArgs = require('command-line-args');
const _ = require('lodash');
const fs = require('fs');
const request = require('request-promise');

const bingGeo = require('../src/bing-geo');
const urlUtil = require('../src/url-util');

const optionDefinitions = [
  { name: 'locations', type: String, defaultOption: true},
];

const options = commandLineArgs(optionDefinitions);
const locations = JSON.parse(fs.readFileSync(options.locations, 'utf8'));

let urlBase = 'http://dev.virtualearth.net/REST/v1/Locations';
let key = {
    key: process.env.BING_MAPS_KEY
};

let requestFactory = function(location) {
    return  function (resultArray) {
        let queryString = urlUtil.getQueryString(location, key);
        let getUrl = urlUtil.makeUrl({base: urlBase, query: queryString});
        return request(getUrl)
            .then(function(body) {
                let deserializedBody = JSON.parse(body);
                let coords = bingGeo.location.response.getCoords(deserializedBody);
                return resultArray.concat({
                    location: location,
                    coords: coords
                });
            });
    };
};

locations.reduce((acc, x) => {
    return acc.then(requestFactory(x));
}, 
    Promise.resolve([]))
    .then(function(allResults) { 
        process.stdout.write(JSON.stringify(allResults));
    });

