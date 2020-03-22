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
  teamPlayerOnOffDetails: general,
  playerCompare: general,

  boxScoreSummary: general,
  boxScore: general,
  leagueGameLog: general,
  leagueLeaders: base,
  leagueStandings: general,
  playerHustleLeaders: general,
  teamHustleLeaders: general,
  playerHustle: general,
  teamHustle: general,
};

function makeStatsMethod (endpoint, transport) {

  const defaults = {};
  endpoint.parameters.forEach(function (param) {
    defaults[param] = paramMap[param].default;
  });

  const ccName = camelCase(endpoint.name);
  const transform = transformMap[ccName];
  if (transform == null) console.log(ccName);

  function statsMethod (query = {}, opts = {}) {
    const reqParams = { ...defaults, ...query };

    const options = {
      ...opts,
      headers: {
        "x-nba-stats-origin": "stats",
        "x-nba-stats-token": "true",
        ...opts.headers ,
      },
    };

    return transport(endpoint.url, reqParams, options).then(function (response) {
      if (response == null) return;

      // response is something like "GameID is required"
      if (typeof response === "string") throw new Error(response);

      return transform ? transform(response) : response;
    });
  }

  Object.defineProperty(statsMethod, "name", {
    value: ccName,
    writable: false,
    enumerable: false,
    configurable: true,
  });

  statsMethod.parameters = endpoint.parameters;
  statsMethod.defaults = defaults;
  return statsMethod;
}

function makeStatsClient (transport) {
  const client = {};
  template.stats_endpoints.forEach((endpoint) => {
    client[camelCase(endpoint.name)] = makeStatsMethod(endpoint, transport);
  });
  client.withTransport = makeStatsClient;
  return client;
}

module.exports = makeStatsClient(require("./get-json"));
