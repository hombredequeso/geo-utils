var _ = require('lodash');

let m = function(){};

m.prototype.getQueryString = function(queryParameters) {

    let paramsIn = Array.isArray(queryParameters) 
        ? queryParameters 
        : [].slice.call(arguments).splice(0);

    let allQueryParams = 
        _.chain(paramsIn)
        .flatMap(q => _.toPairs(q))
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .value();

    let paramStr = allQueryParams.join('&');
    return paramStr;
};

m.prototype.makeUrl = function(parts) {
    let hasQuery = parts.query && parts.query != '';
    return hasQuery
    ? `${parts.base}?${parts.query}`
    : `${parts.base}`;
};

module.exports = new m()

