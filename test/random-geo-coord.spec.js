const _ = require('lodash');
const chai = require('chai');
const request = require('request-promise');
const randomGeoCoord = require('../src/random-geo-coord')

let expect = chai.expect;

describe('random-geo-coord', function() {
    describe('get', function() {
        it('throws exception when nothing in geoData list', function() {
            let f = () => randomGeoCoord.get([]);
            expect(f).to.throw("No data in geoData array")
        });

        it('returns sole item in list', function() {
            let geoData = [
                {
                    name: "place#0",
                    population: 1,
                    coord: {
                        lat: 1,
                        lon: 2
                    }
                }
            ];

            let result = randomGeoCoord.get(geoData);

            let expectedResult = 
                {
                    place: geoData[0],
                    coord: {
                        lat: 1,
                        lon: 2
                    }
                };
            expect(result).to.eql(expectedResult);
        });
    });
});

