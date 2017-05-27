const _ = require('lodash');
const chai = require('chai');
const request = require('request-promise');
const randomGeoCoord = require('../src/random-geo-coord')

let expect = chai.expect;

describe('random-geo-coord', function() {
    describe('get', function() {

        let createItem = i => {
            return {
                    name: `place#${i}`,
                    population: 1,
                    coord: {
                        lat: i * 100,
                        lon: (i*100) + 1 
                    }
            };

        }

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

            expect(result).to.eql(geoData[0]
            );
        });

        it('returns 2 equally weighted items about 50% of the time', function() {
            let geoData = Array(2).fill(0).map((_, i) => createItem(i));
            let iterations = 1000;

            let result = Array(iterations).fill(0).map(_ => randomGeoCoord.get(geoData));

            let groupedResults = _.groupBy(result, x => x.name);

            expect(_.keys(groupedResults).length).to.equal(2);
        })
    });

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

