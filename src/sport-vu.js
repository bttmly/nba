const {interpolate} = require("./util/string");
const {general} = require("./transforms");
const endpoints = require("./sport-vu-endpoints");
const getJson = require("./get-json");

function getTransform (endpoint) { return general; }

function makeSportVuMethod (endpoint, transport) {
  const makeUrl = interpolate(endpoint.url);
  const transform = getTransform(endpoint);

  function sportVuMethod (options = {}) {
    options = Object.assign({}, endpoint.defaults, options);
    return transport(makeUrl(options), {}).then(transform);
  }

  sportVuMethod.defaults = endpoint.defaults;
  sportVuMethod.params = endpoint.params ?
    endpoint.params :
    Object.keys(endpoint.defaults);

  return sportVuMethod;
}

function makeSportVuClient (transport) {
  const client = {};
  endpoints.forEach(endpoint => {
    client[endpoint.name] = makeSportVuMethod(endpoint, transport);
  });
  client.withTransport = makeSportVuClient;
  return client;
}

module.exports = makeSportVuClient(getJson);
