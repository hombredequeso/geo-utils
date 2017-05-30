const chai = require('chai');
const request = require('request-promise');
const bingGeo = require('../lib/bing-geo');
const urlUtil = require('../lib/url-util');

const expect = chai.expect;

describe('bing-geo IntegrationTest', function() {
    let bingMapsKey = null;

    describe('location', function() {

        before(function() {
            if (process.env.BING_MAPS_KEY) {
                bingMapsKey = process.env.BING_MAPS_KEY;
            } else {
                this.skip();
            }
        });

        it('GET melbourne', function(done) {
            let urlBase = 'http://dev.virtualearth.net/REST/v1/Locations';
            let location = {
                countryRegion: 'AU',
                locality: 'melbourne'
            };
            let key = {
                key: bingMapsKey
            };

            let queryString = urlUtil.getQueryString(location, key);
            let getUrl = urlUtil.makeUrl({base: urlBase, query: queryString});

            request(getUrl)
                .then(function(body) {
                    let resp = JSON.parse(body);
                    let coords = bingGeo.location.response.getCoords(resp);
                    expect(coords).to.eql(
                        { 
                            lat: -37.8175315856934, 
                            lon: 144.967147827148 
                        });
                    done();
                })
                .catch(function(err) {
                    done(new Error(err));
                });
        });
    })
});
