var _ = require('lodash');

let m = function(){};

let getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * get a random, weighted, element from an array.
 * @param {function} getRandom(min, max) - returns random number between min (inclusive) and max (inclusive)
 * @param {array} weightedElements - array with elements of the form: {weight: i}
 * @returns {object} - random element from weightedElements
 * @example
 * let getRandom = (min, max) => Math.random(min, max);
 * let weightedElements = [{value: 1, weight: 10}, {value: 2, weight: 20}];
 * let randomWeightedElement = get(getRandom, weightedElements);
*/
// m.prototype.get = function(getRandom, weightProperty, weightedElements) {
m.prototype.get = function(a, b, c) {

    var getRandom = arguments.length === 3 ? arguments[0] : getRandomIntInclusive;
    var weightProperty = arguments.length === 3 ? arguments[1] : arguments[0];
    var weightedElements = arguments.length === 3 ? arguments[2] : arguments[1];

    if (weightedElements.length === 0)
        throw new Error('weightedElements cannot be empty');
    let totalWeight = _.sumBy(weightedElements, e => e[weightProperty])
    if (totalWeight === 0)
        throw new Error('total weights must be greater than 0')

    let randomWeight = getRandom(1, totalWeight);

    let initialAcc = {
        result: null,
        accumulatedWeight: 0
    };

    let result = weightedElements.reduce((a,c) => {
        if (a.result !== null) {
            return a;
        }
        let newWeight = a.accumulatedWeight + c[weightProperty];
        let gotElement = newWeight >= randomWeight? c: null;
        return {
            result: gotElement,
            accumulatedWeight: newWeight
        };
    }, initialAcc);

    return result.result;
};

/**
 * get a random number between min and max, scaling the randomization according to scaleFactor.
 *   the higher the scaling, the stronger the weighting of randomization towards 0.
 *   scaling = 1 means no weighting at all.
 * @param {function} getRandom - returns random number between 0 (inclusive) - 1 (exclusive)
 * @param {int} min - minimum (inclusive)
 * @param {int} max - maximum (exclusive)
 * @param {int} scaleFactor - index scaling to apply.
**/
m.prototype.getScaledRandom = function(getRandom, min, max, scaleFactor) {
    let rr = getRandom();
    let r = Math.pow(rr, scaleFactor);
    let range = max - min;
    let result = (r * range) + min;
    return result;
};

module.exports = new m()

