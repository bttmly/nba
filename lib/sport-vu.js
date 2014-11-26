"use strict";

var Promise = require("./promise");
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
}, {});

var cache = {};

var getSportVu = function (key, noCache) {
  return new Promise(function (resolve, reject) {
    var item;
    if (cache[key] == null || noCache) {
      item = sportVuScripts[key];
      return getScript(item.url, item.varName)
        .then(resolve)
        .catch(reject);
    }
    resolve(cache[key]);
  });
};

module.exports = Object.keys(sportVuScripts).reduce(function (obj, key) {
  obj[key] = function () {
    return getSportVu(key);
  };
  return obj;
}, {});
