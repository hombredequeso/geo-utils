var weightedRandom = require('../src/weighted-random');
var chai = require('chai');
var _ = require('lodash');

var expect = chai.expect;

let getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getWeightedRandom = _.curry(weightedRandom.get)(getRandomIntInclusive)("weight");

describe('get', function() {
    it('returns sole item from one element list', function() {
        let soleItem = {value: 1, weight: 2};
        let result = weightedRandom.get(getRandomIntInclusive, 'weight', [soleItem])
        expect(result).to.equal(soleItem);
    });

    it('uses a default random number provider if one is not provided in argument list', function() {
        let soleItem = {value: 1, weight: 2};
        let result = weightedRandom.get('weight', [soleItem])
        expect(result).to.equal(soleItem);
    });

    it('throws exception if nothing in weighted array', function() {
        let f = function() {getWeightedRandom([]);}
        expect(f).to.throw('weightedElements cannot be empty')
    });

    it('throws exception if totalWeights are zero', function() {
        let items = (new Array(10))
            .fill(0)
            .map((v,i) => {return {value: i, weight: 0};});
        let f = function() {getWeightedRandom(items);}
        expect(f).to.throw('total weights must be greater than 0')
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

        let result = weightedRandom.get(getRandomIntInclusive, "population", geoData);
        expect(result).to.eql(geoData[0]);

    });

    it('returns roughly even distribution of equally weighted elements', function() {
        let itemCount = 2;
        let items = (new Array(itemCount))
            .fill(0)
            .map((v,i) => {return {value: i, weight: 1};});

        let totals = new Array(items.length).fill(0);

        let iterations = 1000;
        for(let i=0;i<iterations;i++) {
            let item = getWeightedRandom(items);
            totals[item.value]++;
        }

        let expectedCount = iterations / items.length;
        let allowedVariation = 100;

        totals.forEach(t => 
            expect(t).to.be.closeTo(expectedCount, allowedVariation))
    });
});

describe('getScaledRandom', function() {
    it('returns a result between min (inclusive) and max (exclusive)', function() {
        let min = 0;
        let max = 10;
        let zeroWeighting = 2;

        let result = weightedRandom.getScaledRandom(Math.random, min, max, 1);

        expect(result).to.be.at.least(min);
        expect(result).to.be.below(max);
    });

    it('returns linearly distributed results for factor of 1', function() {
        let min = 0;
        let max = 10;
        let totals = new Array(max - min).fill(0);

        let iterations = 10000;
        for(let i=0;i<iterations;i++) {
            let result = weightedRandom.getScaledRandom(Math.random, min, max, 1);
            totals[Math.floor(result)]++;
        }

        let expectedCount = iterations / (max - min);
        let allowedVariation = expectedCount * 0.1;
        totals.forEach(t => 
            expect(t).to.be.closeTo(expectedCount, allowedVariation))
    });

    it('returns non-linearly distributed results for factor of 1.5', function() {
        let min = 0;
        let max = 10;
        let totals = new Array(max - min).fill(0);

        let iterations = 50000;
        for(let i=0;i<iterations;i++) {
            let result = weightedRandom.getScaledRandom(Math.random, min, max, 1.5);
            totals[Math.floor(result)]++;
        }

        for(let z=1; z < totals.length; z++) {
            expect(totals[z]).to.be.below(totals[z-1]);
        }
    });
});

