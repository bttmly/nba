"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const pify = require("pify");

const nba = require("../../lib");

// for interactive inspection, particularly in browser
global.StatsData = {};
const tested = {};
const methods = {};

const blacklist = ["withTransport"];

const set = (a, b, c) => (a[b] = c, a);

const stats = Object.keys(nba.stats).reduce((prox, k) => {
  if (!blacklist.includes(k)) {
    methods[k] = true;
  }

  prox[k] = function () {
    tested[k] = true;
    return nba.stats[k].apply(nba.stats, arguments);
  };

  return prox;
}, {});

// stub for now, will add response shape verification for self-documenting responses
let verifyShape = shape => response => response;

let callMethod = (name, params = {}, shape) => () =>
  stats[name](params).then(r => global.StatsData[name] = r);

const _steph = 201939;
const _dubs = 1610612744;
const steph = {playerId: _steph};
const dubs = {teamId: _dubs};
const game = {gameId: "0021401082"};

// these tests merely ensure that valid stats API calls don't error.
// more comprehensive tests are coming soon.

describe("nba stats methods", function () {

  it("#playerProfile", callMethod("playerProfile", steph));
  it("#playerInfo", callMethod("playerInfo", steph));
  it("#playersInfo", callMethod("playersInfo"));
  it("#teamStats", callMethod("teamStats"));
  it("#teamSplits", callMethod("teamSplits", dubs));
  it("#teamYears", callMethod("teamYears"));
  it("#playerSplits", callMethod("playerSplits", steph));
  it("#shots", callMethod("shots", dubs));
  it("#scoreboard", callMethod("scoreboard", {gameDate: "03/27/2015"}));
  it("#playByPlay", callMethod("playByPlay", game));
  it("#teamHistoricalLeaders", callMethod("teamHistoricalLeaders", {teamId: _dubs, seasonId: "20078"}));
  it("#teamInfoCommon", callMethod("teamInfoCommon", dubs));
  it("#commonTeamRoster", callMethod("commonTeamRoster", dubs));
  it("#teamPlayerDashboard", callMethod("teamPlayerDashboard", {teamId: _dubs, seasonType: "Regular Season"}));
  it("#lineups", callMethod("lineups"));
  it("#playerTracking", callMethod("playerTracking", {ptMeasureType: "CatchShoot"}));

  after(function () {
    return Promise.all(Object.keys(global.StatsData).map(k =>
      pify(fs.writeFile)(path.join(__dirname, "../../responses", k + ".json"), JSON.stringify(global.StatsData[k], null, 2))
    ))
    .catch(() => {});
  });
});

describe("tested all methods", function () {
  it("did test all methods", () => assert.deepEqual(tested, methods));
});