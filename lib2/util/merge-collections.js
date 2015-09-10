"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var findWhere = require("lodash.findwhere");

module.exports = function mergeCollections(idProp, a, b) {
  return a.map(function (itemA) {
    var itemB = findWhere(b, _defineProperty({}, idProp, itemA[idProp]));
    return _extends({}, itemA, itemB);
  });
};