"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var qs = require("querystring");

var partial = require("lodash.partial");

var endpoints = require("./endpoints");
var dicts = require("./dicts");
var translateKeys = require("./util/translate-keys");
var transport = require("./get-json");

var translate = partial(translateKeys, dicts.jsToNbaMap);

var proto = {
  setTransport: function setTransport(_transport) {
    transport = _transport;
  }
};

var stats = Object.create(proto);

Object.keys(endpoints).forEach(function (key) {
  stats[key] = makeStatsMethod(endpoints[key]);
});

function makeStatsMethod(endpoint) {

  return function statsMethod(query, callback) {

    if (typeof query === "function") {
      callback = query;
      query = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    query = _extends({}, endpoint.defaults, translate(query));

    transport(endpoint.url, query, function (err, response) {
      if (err) return callback(err);
      if (response == null) return callback();

      // response is something like "GameID is required"
      if (typeof response === "string") return callback(new Error(response));

      if (endpoint.transform) return callback(null, endpoint.transform(response));
      callback(null, response);
    });
  };
}

module.exports = stats;