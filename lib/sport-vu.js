"use strict";

var getScript = require("./get-script");

var urlRoot = "http://stats.nba.com/js/data/sportvu/";

var sportVuScripts = [
  "speed",
  "touches",
  "passing",
  "defense",
  "rebounding",
  "drives",
  "shooting",
  "catchShoot",
  "pullUpShoot"
].reduce(function (obj, field) {
  obj[field] = {
    url: urlRoot + field + "Data.js",
    varName: field + "Data"
  };
  return obj;
}, {});

var cache = {};

var getSportVu = function (key, options, callback) {
  
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  if (typeof callback !== "function") {
    throw new TypeError("Needs a callback function.");
  }

  var item = sportVuScripts[key];
  
  if (cache[key] == null || options.noCache) {
    return getScript(item.url, item.varName, callback)
  }

  callback(null, cache[key]);
};

module.exports = Object.keys(sportVuScripts).reduce(function (obj, key) {
  obj[key] = function (options, callback) {
    return getSportVu(key, options, callback);
  };
  return obj;
}, {});
