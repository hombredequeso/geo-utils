const _ = require('lodash');
const chai = require('chai');
const request = require('request-promise');
const randomGeoCoord = require('../lib/random-geo-coord')

let expect = chai.expect;

describe('random-geo-coord', function() {
    describe('randomizedCoord', function() {
        it('should return a random coordinate', function() {
            let result = randomGeoCoord.randomizedCoord(Math.random, {lat: 1, lon: 2});
            expect(result.lat).to.be.a('number');
            expect(result.lon).to.be.a('number');
        });
        it('with no variance should return the same number', function() {
            let randomizer = () => 0;
            let coord = {lat: 1, lon: 2};
            let result = randomGeoCoord.randomizedCoord(randomizer, coord, 100);
            expect(result).to.eql(coord);
        });
        it('with full variance should return the same number', function() {
            let distanceBetweenLats = 111.32;
            let l = [0.25, 1];  
            let randomizer = function() {
                return l.pop();
            }
            let coord = {lat: 1, lon: 2};
            let result = randomGeoCoord.randomizedCoord(
                randomizer, coord, distanceBetweenLats);
            expect(result).to.eql({lat: 2, lon:2})
        });
    });
});

