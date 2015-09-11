"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require("./util/string");

var interpolate = _require.interpolate;

var endpoints = require("./sport-vu-endpoints");

var transport = require("./get-json");

var sportVu = Object.create({
  setTransport: function setTransport(_transport) {
    transport = _transport;
  }
});

Object.keys(endpoints).forEach(function (key) {
  sportVu[key] = makeSportVuMethod(endpoints[key]);
});

function makeSportVuMethod(endpoint) {
  var makeUrl = interpolate(endpoint.url);

  return function sportVuMethod(options, callback) {
    if (process.browser) {
      throw new Error("SportVu does not support JSONP");
    }

    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    options = _extends({}, endpoint.defaults, options);

    transport(makeUrl(options), {}, callback);
  };
}

module.exports = sportVu;