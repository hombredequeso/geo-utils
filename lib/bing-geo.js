const _ = require('lodash');

let m = function(){};

_.set(m.prototype, 'location.response', {});

m.prototype.location.response.getCoords = function(resp) {
    let respPoint =  resp.resourceSets[0].resources[0].point;
    return {
        lat: respPoint.coordinates[0],
        lon: respPoint.coordinates[1]
    };
}

module.exports = new m()

