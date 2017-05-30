var chai = require('chai');
var expect = chai.expect;
const urlUtil = require('../src/url-util')

describe('url-util', function() {

    describe('getQueryString', function() {

        const bingMapsKey = 'TESTBINGMAPSKEY';
        let location = {
            countryRegion: 'AU',
            locality: 'melbourne'
        };
        let key = {
            key: 'TESTBINGMAPSKEY' 
        };

        it('returns empty string if no properties available', function() {
            let result = urlUtil.getQueryString({});
            expect(result).to.equal('');
        });


        it('returns a query string', function() {

            let result = urlUtil.getQueryString([location, key]);

            expect(result).to.equal(
                "countryRegion=AU&locality=melbourne&key=TESTBINGMAPSKEY");
        });


        it('returns a query string of all objects passed to it', function() {

            let result = urlUtil.getQueryString(location, key);

            expect(result).to.equal(
                "countryRegion=AU&locality=melbourne&key=TESTBINGMAPSKEY");
        });
    });

    describe('makeUrl', function() {
        it('construct a valid url', function() {

            let urlBase = 'http://dev.virtualearth.net/REST/v1/Locations';
            let queryString = "abc=def&ghi=jkl";
            let result = urlUtil.makeUrl(
            {
                base: urlBase,
                query : queryString
            });
            expect(result).to.equal('http://dev.virtualearth.net/REST/v1/Locations?abc=def&ghi=jkl')
        });

        it('constructs a valid url when no query', function() {
            let urlBase = 'http://dev.virtualearth.net/REST/v1/Locations';
            let result = urlUtil.makeUrl(
            {
                base: urlBase,
                query : ''
            });
            expect(result).to.equal('http://dev.virtualearth.net/REST/v1/Locations')
        });

        it('constructs a valid url when query does not exist', function() {
            let urlBase = 'http://dev.virtualearth.net/REST/v1/Locations';
            let result = urlUtil.makeUrl(
            {
                base: urlBase
            });

            expect(result).to.equal('http://dev.virtualearth.net/REST/v1/Locations')
        });
    });
});
