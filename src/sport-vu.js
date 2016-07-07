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

  function sportVuMethod (options = {}) {
    return Promise.reject(new Error("SportVu does not support JSONP"));
    
    options = {...endpoint.defaults, ...options};

    return transport(makeUrl(options), {});
  };

  if (endpoint.params) {
    sportVuMthod.params = endpoint.params;
  } else {
    sportVuMethod.params = Object.keys(endpoint.defaults);
  }
}

module.exports = sportVu;
