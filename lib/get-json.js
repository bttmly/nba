"use strict";

var request = require("request");

module.exports = function jsonStrategy (url, query, callback) {
  request({
    url: url,
    qs: query,
    json: true,
  }, function (err, resp, body) {
    callback(err, body);
  });
};