const randomGeoCoord = require('../random-geo-coord')
const commandLineArgs = require('command-line-args');
const _ = require('lodash');
const fs = require('fs');

const optionDefinitions = [
  { name: 'locations', type: String, defaultOption: true},
  { name: 'count', type: Number},

];

const options = commandLineArgs(optionDefinitions);
const coordCount = options.count || 10;

const locations = JSON.parse(fs.readFileSync(options.locations, 'utf8'));

process.stdout.write('[\n')
_(Array(coordCount)).forEach((v,i) => {

    let randomCoord = randomGeoCoord.randomizedCoord(Math.random, randomGeoCoord.get(locations).location, 20, 1.5);
    process.stdout.write(JSON.stringify(randomCoord));
    process.stdout.write(i < coordCount - 1? ',\n': '');
});
process.stdout.write('\n]')

