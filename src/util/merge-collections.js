const findWhere = require("lodash.findwhere");

module.exports = function mergeCollections (idProp, a, b) {
  return a.map(function (itemA) {
    var itemB = findWhere(b, { [idProp]: itemA[idProp] });
    return Object.assign({}, itemA, itemB);
  });
};
