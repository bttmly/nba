"use strict";

var qs = require("qs");

var ep = require("./endpoints");
var maps = require("./maps");
var util = require("./util");
var getJSON = require("./get-json");

var translate = util.partial(util.translateKeys, maps.twoWayMap());

// throw a .debug on main api?
var recordedUrls = [];

// TODO refactor
var flags = {
  recordUrls: false
};

var api = util.makeDict();


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

    if (typeof cb !== "function") {
      throw new TypeError("Must pass a callback.");
    }

    // this is a temporary fix; figure out a better way to handle this long term.
    try {
      options = util.merge(ep[key].defaults(), translate(options));
    } catch (err) {
      return cb(err);
    }

    if (api._flags.recordUrls) {
      recordUrl(ep[key], options);
    }

    return getJSON(ep[key].url, options, function (err, response) {
      if (err) {
        return cb(err);
      }
      cb(null, ep[key].transform(response));
    });
  };
});

module.exports = api;
