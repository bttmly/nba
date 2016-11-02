const camelCase = require("camel-case");

const parameters = [
  {
    name: "name",
    default: "offensive",
    values: [
      "offensive",
      "defensive",
      ],
  },
  {
    name: "seasonType",
    default: "Reg",
    values: [
      "Reg",
      "Post",
    ],
  },
  {
    name: "category",
    default: null,
    values: [
      "Transition",
      "PRBallHandler",
      "PRRollman",
      "Postup",
      "Spotup",
      "Handoff",
      "Cut",
      "OffScreen",
      "OffRebound",
      "Misc",
    ],
  },
  {
    name: "season",
    default: 2015,
  },
];

const synergyEndpoints = [
  { name: "player_play_type", url: "http://stats-prod.nba.com/wp-json/statscms/v1/synergy/player/" },
  { name: "team_play_type", url: "http://stats-prod.nba.com/wp-json/statscms/v1/synergy/team/" },
];

const defaults = {};
parameters.forEach(function (param) {
  defaults[param.name] = param.default;
});

function makeSynergyMethod (endpoint, transport) {
  function synergyMethod (query = {}, options = {}) {
    const reqParams = Object.assign({}, defaults, query);
    return transport(endpoint.url, reqParams)
      .then(function (response) {
        return response;
      });
  }
  return synergyMethod;
}

function makeSynergyClient (transport) {
  const client = {};
  synergyEndpoints.forEach(function (endpoint) {
    client[camelCase(endpoint.name)] = makeSynergyMethod(endpoint, transport);
  });
  client.withTransport = makeSynergyClient;
  return client;
}

module.exports = makeSynergyClient(require("./get-json"));
