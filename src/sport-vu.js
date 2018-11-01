const defaults = { season: 2017 };

const endpoints = [
  { name: "speed", defaults },
  { name: "touches", defaults },
  { name: "passing", defaults },
  { name: "defense", defaults },
  { name: "rebounding", defaults },
  { name: "drives", defaults },
  { name: "shooting", defaults },
  { name: "catchShoot", defaults },
  { name: "pullUpShoot", defaults },
];

function makeSportVuMethod (endpoint) {
  function sportVuMethod () {
    return Promise.reject(new Error("NBA.com has removed the sportVu endpoints."));
  }
  sportVuMethod.defaults = endpoint.defaults;
  sportVuMethod.params = Object.keys(endpoint.defaults);
  return sportVuMethod;
}

function makeSportVuClient () {
  const client = {};
  endpoints.forEach(endpoint => {
    client[endpoint.name] = makeSportVuMethod(endpoint);
  });
  client.withTransport = makeSportVuClient;
  return client;
}

module.exports = makeSportVuClient();
