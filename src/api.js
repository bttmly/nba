const qs = require("qs");

const partial = require("lodash.partial");

const endpoints = require("./endpoints");
const dicts = require("./dicts");
const translateKeys = require("./util/translate-keys");
let transport = require("./get-json");

const translate = partial(translateKeys, dicts.jsToNbaMap);

const api = {}

Object.keys(endpoints).forEach(key => {
  api[key] = makeApiMethod(endpoints[key]);
});

function makeApiMethod (endpoint) {

  return function (query, callback) {

    if (typeof query === "function") {
      callback = query;
      query = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    query = {...endpoint.defaults, ...translate(query)};

    transport(endpoint.url, query, function (err, response) {
      if (err) return callback(err);
      if (response == null) return callback();

      // response is something like "GameID is required"
      if (typeof response === "string") return callback(new Error(response));

      if (endpoint.transform) return callback(null, endpoint.transform(response));
      callback(null, response);
    });
  }
}

Object.defineProperty(api, "setTransport", {
  value (_transport) {
    transport = _transport;
  },
  enumerable: false,
  configurable: true,
  writable: true,
});

module.exports = api;
