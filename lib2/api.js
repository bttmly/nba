"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var qs = require("qs");

var partial = require("lodash.partial");

var endpoints = require("./endpoints");
var dicts = require("./dicts");
var translateKeys = require("./util/translate-keys");
var transport = require("./get-json");

var translate = partial(translateKeys, dicts.jsToNbaMap);

var api = {};

Object.keys(endpoints).forEach(function (key) {
  api[key] = makeApiMethod(endpoints[key]);
});

function makeApiMethod(endpoint) {

  return function (query, callback) {

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

Object.defineProperty(api, "setTransport", {
  value: function value(_transport) {
    transport = _transport;
  },
  enumerable: false,
  configurable: true,
  writable: true
});

module.exports = api;