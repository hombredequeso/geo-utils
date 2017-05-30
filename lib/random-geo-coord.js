const _ = require('lodash');
const weightedRandom = require('./weighted-random')

let m = function(){};

let addCoords = (a,b) => {return {lat: a.lat + b.lat, lon: a.lon + b.lon};};

// https://en.wikipedia.org/wiki/Decimal_degrees
m.prototype.convertToLatLonDiff = function(distanceKm, angleRadians, atLat) {
    var atLat = atLat || 0;
    let kmPerDegreeAtEquator = 111.32;           // 110.25;
    let latChange = (distanceKm * Math.sin(angleRadians))/kmPerDegreeAtEquator;
    let lonChange = (distanceKm * Math.cos(angleRadians))/
        (kmPerDegreeAtEquator * (Math.cos(atLat * Math.PI / 180.0)));
    return {
        lat: latChange,
        lon: lonChange
    };
}

/**
 * get a random geo-coordinate, within a certain distance from a specified geo-coordinate.
 * @param {-> float} getRandom - function returning a float between 0 (incl) and 1 (excl)
 * @param {object} nearCoord - geo-coordinate of form {lat: 0, lon: 0}
 * @param {float} withinDistanceKm - maximum distance away from nearCoord
 * @returns {object} - geo-coordinate of form {lat: 0, lon: 0}
**/
m.prototype.randomizedCoord = function(
    getRandom, nearCoord, withinDistanceKm, centreWeighting) {

    let centreWeighting2 = centreWeighting || 1;
    let distKm = withinDistanceKm || 0;
    let randomDistKm = weightedRandom.getScaledRandom(
        getRandom, 0.0, distKm, centreWeighting2);
    let randomAngleInRadians = getRandom() * 2 * Math.PI;
    let coordOffset = this.convertToLatLonDiff(
        randomDistKm, randomAngleInRadians, nearCoord.lat);
    return addCoords(nearCoord, coordOffset);
};

module.exports = new m()

