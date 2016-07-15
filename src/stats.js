const qs = require("querystring");
const { format } = require("util");

const template = require("nba-client-template");

const partial = require("lodash.partial");

const dicts = require("./dicts");
const translateKeys = require("./util/translate-keys");
const { downcaseFirst } = require("./util/string");
const params = require("./params");
const { general, players, base, lineups } = require("./transforms");

let transport = require("./get-json");

const translate = partial(translateKeys, dicts.jsToNbaMap);

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

const stats = Object.create({
  setTransport (_transport) {
    transport = _transport;
  },
  getTransport () {
    return transport;
  },
});

// Object.keys(endpoints).forEach(key => {
//   stats[key] = makeStatsMethod(endpoints[key], key);
// });

template.stats_endpoints.forEach(function (endpoint) {
  const methodName = downcaseFirst(endpoint.name);
  stats[methodName] = makeStatsMethod(endpoint);
});

function makeStatsMethod (endpoint) {

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

    // if (!options.noValidate) {
    //   Object.keys(translated).forEach(function (name) {
    //     if (NO_CHECK.hasOwnProperty(name)) {
    //       return;
    //     }
    //     if (params[name][translated[name]] == null) {
    //       console.log("invalid value for", name, ":", translated[name]);
    //     }
    //   }); 
    // }

    const reqParams = Object.assign({}, defaults, translated);

    // console.log(endpoint.url + "?" + qs.stringify(reqParams));
    return transport(endpoint.url, reqParams).then(function (response) {
      if (response == null) return;

      // response is something like "GameID is required"
      if (typeof response === "string") throw new Error(response);

      return transform(response);
    });

  }

  statsMethod.params = endpoint.params;

  return statsMethod;
}

module.exports = stats;
