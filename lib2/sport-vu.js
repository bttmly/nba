"use strict";

var transport = require("./get-script");

var URL_ROOT = "http://stats.nba.com/js/data/sportvu/";

var SPORT_VU_STATS = ["speed", "touches", "passing", "defense", "rebounding", "drives", "shooting", "catchShoot", "pullUpShoot"];

var proto = {
  setTransport: function setTransport(_transport) {
    transport = _transport;
  }
};

var sportVu = Object.create(proto);

SPORT_VU_STATS.forEach(function (stat) {
  sportVu[stat] = makeSportVuMethod(stat);
});

function makeSportVuMethod(stat) {
  return function sportVuMethod(callback) {

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    var varName = stat + "Data";
    var scriptUrl = URL_ROOT + stat + "Data.js";

    transport(scriptUrl, varName, callback);
  };
}

module.exports = sportVu;