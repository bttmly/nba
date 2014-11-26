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
  return obj;
}, {});

var cache = {};

var getSportVu = function (key, options) {
  return new Promise(function (resolve, reject) {
    var item;
    if (options == null) {
      options = {};
    }
    if (cache[key] == null || options.noCache) {
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
