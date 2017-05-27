const _ = require('lodash');

let m = function(){};

m.prototype.get = function(geoData) {
    if (geoData.length < 1) {
        throw "No data in geoData array";
    }

    let place = geoData[0];
    return {
        place: place,
        coord: place.coord
    };
};

module.exports = new m()

