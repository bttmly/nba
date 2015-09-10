"use strict";

var qs = require("querystring");

var partial = require("lodash.partial");
var assign = require("object-assign");

var ep = require("./endpoints");
var maps = require("./maps");
var util = require("./util");
var getJSON = require("./get-json");

var translate = partial(util.translateObjectKeys, maps.jsToNbaMap());

// throw a .debug on main api?
var recordedUrls = [];

// TODO refactor
var flags = {
  recordUrls: false
};

var api = {};

api._flags = flags;
api._recordedUrls = recordedUrls;

function recordUrl (url, query) {
  recordedUrls.push(url + "?" + qs.stringify(query));
}

Object.keys(ep).forEach(function (key) {
  api[key] = function (options, cb) {

    if (typeof options === "function") {
      cb = options;
      options = {};
    }

    if (typeof cb !== "function")
      throw new TypeError("Must pass a callback.");

    // this will throw synchronously if the options are bad
    options = assign(ep[key].defaults(), translate(options));

    if (api._flags.recordUrls) {
      recordUrl(ep[key], options);
    }

    return getJSON(ep[key].url, options, function (err, response) {
      if (err) return cb(err);
      if (response == null) return cb();

      // response is something like "GameID is required"
      if (typeof response === "string") return cb(new Error(response));

      cb(null, ep[key].transform(response));
    });

  };
});

module.exports = api;
