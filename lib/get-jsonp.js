"use strict";

var qs = require("querystring");
var jsonp = require("jsonp");

var transportConfig = require("./transport-config");

function getJsonp(url, query, callback) {
  url += "?" + qs.stringify(query);
  jsonp(url, { timeout: transportConfig.timeout }, function (err, result) {
    if (err) {
      // for compatibility with timeouts from request module
      if (err.message === "Timeout") err.code = "ETIMEDOUT";
      callback(err);
    }
    callback(null, result);
  });
}

module.exports = getJsonp;