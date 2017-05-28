const randomGeoCoord = require('../random-geo-coord')
const commandLineArgs = require('command-line-args');
const _ = require('lodash');
const fs = require('fs');

const optionDefinitions = [
  { name: 'locations', type: String, defaultOption: true}
];

const options = commandLineArgs(optionDefinitions);

const locations = JSON.parse(fs.readFileSync(options.locations, 'utf8'));

let coordCount = 10;
let allCoords = [];

for (let i=0; i<coordCount; ++i) {
    let randomCoord = randomGeoCoord.randomizedCoord(Math.random, randomGeoCoord.get(locations).location, 20, 1.5);
    allCoords.push(randomCoord);
}

console.log(allCoords);

