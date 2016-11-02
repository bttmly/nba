const qs = require("querystring");
const debug = require("debug")("nba");
const template = require("nba-client-template");
const camelCase = require("camel-case");

const { general, players, base, lineups } = require("./transforms");

const paramMap = {};
template.parameters.forEach(function (param) {
  paramMap[param.name] = param;
});

const transformMap = {
  playerProfile:  general,
  playerInfo: general,
  playersInfo: players,
  teamStats: base,
  teamSplits: general,
  teamYears: base,
  playerSplits: general,
  shots: general,
  scoreboard: general,
  playByPlay: general,
  teamHistoricalLeaders: general,
  teamInfoCommon: general,
  commonTeamRoster: general,
  teamPlayerDashboard: general,
  lineups: lineups,
  playerTracking: general,
  homepageV2: general,
  assistTracker: general,
  playerStats: general,
  playerClutch: general,
  teamClutch: general,
  playerShooting: general,
  teamShooting: general,
};

function makeStatsMethod (endpoint, transport) {

  const defaults = {};
  endpoint.parameters.forEach(function (param) {
    defaults[param] = paramMap[param].default;
  });

  const ccName = camelCase(endpoint.name);
  const transform = transformMap[ccName];
  // if (transform == null) {
  //   throw new Error(`No transform found for ${ccName}`);
  // }

  function statsMethod (query = {}, options = {}) {
    const reqParams = Object.assign({}, defaults, query);

    debug("stats request", endpoint.url, reqParams);
    return transport(endpoint.url, reqParams).then(function (response) {
      if (response == null) return;

      // response is something like "GameID is required"
      if (typeof response === "string") throw new Error(response);

      return transform ? transform(response) : response;
    });
  }

  statsMethod.parameters = endpoint.parameters;
  statsMethod.defaults = defaults;
  return statsMethod;
}

function makeStatsClient (transport) {
  const client = {};
  template.stats_endpoints.forEach(function (endpoint) {
    client[camelCase(endpoint.name)] = makeStatsMethod(endpoint, transport);
  });
  client.withTransport = makeStatsClient;
  return client;
}

module.exports = makeStatsClient(require("./get-json"));
