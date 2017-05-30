const chai = require('chai');
const sampleBingLocationResponse = require("./bing-sample-get-location-response.json");
const expect = chai.expect;
const bingGeo = require('../lib/bing-geo');

describe('bing-geo', function() {
    describe('location', function() {
        describe('getCoords', function() {
            it('can extract geo-coords from response', function() {
                let result = bingGeo.location.response.getCoords(sampleBingLocationResponse);
                let expectedResult = {
                    lat: -37.8175315856934,
                    lon: 144.967147827148
                };
                expect(result).to.eql(expectedResult);
            });
        });
    })
});

