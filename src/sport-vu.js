const {interpolate} = require("./util/string");
const endpoints = require("./sport-vu-endpoints");

function makeSportVuMethod (endpoint, transport) {
  const makeUrl = interpolate(endpoint.url);

  function sportVuMethod (options = {}) {
    options = Object.assign({}, endpoint.defaults, options);
    return transport(makeUrl(options), {});
  };

  if (endpoint.params) {
    sportVuMthod.params = endpoint.params;
  } else {
    sportVuMethod.params = Object.keys(endpoint.defaults);
  }

  return sportVuMethod;
}

function makeSportVuClient (transport) {
  const client = {};
  endpoints.forEach(endpoint => {
    client[endpoint.name] = makeSportVuMethod(endpoint, transport);
  });
  client.withTransport = function (_transport) {
    return makeSportVuClient(_transport);
  };
  return client;
}

module.exports = makeSportVuClient(require("./get-json"));
