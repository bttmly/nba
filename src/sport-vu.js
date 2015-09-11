const {interpolate} = require("./util/string");
const endpoints = require("./sport-vu-endpoints");

let transport = require("./get-json");

const sportVu = Object.create({
  setTransport (_transport) {
    transport = _transport;
  },
});

Object.keys(endpoints).forEach(key => {
  sportVu[key] = makeSportVuMethod(endpoints[key]);
});

function makeSportVuMethod (endpoint) {
  const makeUrl = interpolate(endpoint.url);

  return function sportVuMethod (options, callback) {
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

    options = {...endpoint.defaults, ...options};

    transport(makeUrl(options), {}, callback);
  };
}

module.exports = sportVu;
