"use strict";

var transport = require("./get-script");

var URL_ROOT = "http://stats.nba.com/js/data/sportvu/";

var SPORT_VU_STATS = ["speed", "touches", "passing", "defense", "rebounding", "drives", "shooting", "catchShoot", "pullUpShoot"];

var sportVu = {};

SPORT_VU_STATS.forEach(function (stat) {
  sportVu[stat] = makeSportVuMethod(stat);
});

function makeSportVuMethod(stat) {
  return function sportVu(callback) {

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    var varName = stat + "Data";
    var scriptUrl = URL_ROOT + stat + "Data.js";

    transport(scriptUrl, varName, callback);
  };
}

Object.defineProperty(sportVu, "setTransport", {
  value: function value(_transport) {
    transport = _transport;
  },
  enumerable: false,
  configurable: true,
  writable: true
});

module.exports = sportVu;