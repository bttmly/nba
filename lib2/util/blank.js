"use strict";

module.exports = function blank(obj) {
  var out = Object.create(null);
  if (obj) {
    Object.keys(obj).forEach(function (key) {
      out[key] = obj[key];
    });
  }
  return out;
};