const qs = require("querystring");

const template = require("nba-client-template");

const dicts = require("./dicts");
const translateKeys = require("./util/translate-keys");
const { downcaseFirst } = require("./util/string");
const { general, players, base, lineups } = require("./transforms");

const translate = query => translateKeys(dicts.jsToNbaMap, query);

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
};

function makeStatsMethod (endpoint, transport) {

  const defaults = {};
  endpoint.parameters.forEach(function (param) {
    defaults[param] = paramMap[param].default;
  });

  const transform = transformMap[endpoint.name];
  if (transform == null) {
    throw new Error(`No transform found for ${endpoint.name}`);
  }

  function statsMethod (query = {}, options = {}) {
    const translated = translate(query);
    const reqParams = Object.assign({}, defaults, translated);

    // console.log(endpoint.url + "?" + qs.stringify(reqParams));
    return transport(endpoint.url, reqParams).then(function (response) {
      if (response == null) return;

      // response is something like "GameID is required"
      if (typeof response === "string") throw new Error(response);

      return transform(response);
    });
  }

  statsMethod.parameters = endpoint.parameters;
  statsMethod.defaults = endpoint.defaults;
  return statsMethod;
}

function makeStatsClient (transport) {
  const client = {};
  template.stats_endpoints.forEach(function (endpoint) {
    const methodName = downcaseFirst(endpoint.name);
    client[methodName] = makeStatsMethod(endpoint, transport);
  });
  client.withTransport = makeStatsClient;
  return client;
}

module.exports = makeStatsClient(require("./get-json"));
