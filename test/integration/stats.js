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
const verifyShape = shape => response => response;

const callMethod = (name, params = {}, shape) => () => {
  params.Season = "2016-17";
  return stats[name](params).then(r => global.StatsData[name] = r);
};

const _steph = 201939;
const _dubs = 1610612744;
const steph = {PlayerID: _steph};
const dubs = {TeamID: _dubs};
const game = {GameID: "0021401082"};

// these tests merely ensure that valid stats API calls don't error.
// more comprehensive tests are coming... eventually :/

describe("nba stats methods", function () {

  it("#playerProfile", callMethod("playerProfile", steph));
  it("#playerInfo", callMethod("playerInfo", steph));
  it("#playersInfo", callMethod("playersInfo"));
  it("#teamStats", callMethod("teamStats"));
  it("#teamSplits", callMethod("teamSplits", dubs));
  it("#teamYears", callMethod("teamYears"));
  it("#playerSplits", callMethod("playerSplits", steph));
  it("#shots", callMethod("shots", dubs));
  it("#scoreboard", callMethod("scoreboard", {gameDate: "03/27/2015"})); // response says "GameDate is required" but it doesn't seem to work with uppercase first letter unlike every other parameter -- WTF.
  it("#playByPlay", callMethod("playByPlay", game));
  it("#teamHistoricalLeaders", callMethod("teamHistoricalLeaders", {TeamID: _dubs, SeasonID: "20078"}));
  it("#teamInfoCommon", callMethod("teamInfoCommon", dubs));
  it("#commonTeamRoster", callMethod("commonTeamRoster", dubs));
  it("#teamPlayerDashboard", callMethod("teamPlayerDashboard", {TeamID: _dubs, SeasonType: "Regular Season"}));
  it("#lineups", callMethod("lineups"));
  it("#playerTracking", callMethod("playerTracking", {PtMeasureType: "CatchShoot"}));
  it("#homepageV2", callMethod("homepageV2", {StatType: "Traditional", GameScope: "Season", PlayerScope: "All Players"}));
  it("#assistTracker", callMethod("assistTracker"));
  it("#playerStats", callMethod("playerStats"));
  it("#playerClutch", callMethod("playerClutch", {ClutchTime: "Last 5 Minutes", AheadBehind: "Ahead or Behind", PointDiff: 5}));
  it("#teamClutch", callMethod("teamClutch", {ClutchTime: "Last 5 Minutes", AheadBehind: "Ahead or Behind", PointDiff: 5}));
  it("#playerShooting", callMethod("playerShooting"));
  it("#teamShooting", callMethod("teamShooting"));
  it("#boxScoreSummary", callMethod("boxScoreSummary", game));
  it("#boxScore", callMethod("boxScore", game));
  it("#leagueGameLog", callMethod("leagueGameLog", {PlayerOrTeam: "T"}));
  it("#leagueLeaders", callMethod("leagueLeaders"));
  it("#playerHustleLeaders", callMethod("playerHustleLeaders"));
  it("#teamHustleLeaders", callMethod("teamHustleLeaders"));
  it("#playerHustle", callMethod("playerHustle"));
  it("#teamHustle", callMethod("teamHustle"));

  after(function () {
    return Promise.all(Object.keys(global.StatsData).map(k =>
      pify(fs.writeFile)(
        path.join(__dirname, "../../responses", `stats-${k}.json`),
        JSON.stringify(global.StatsData[k], null, 2)
      )
    ))
    .catch(console.error);
  });
});

describe("tested all methods", function () {
  it("did test all methods", () => {
    try {
      assert.deepEqual(tested, methods)
    } catch (e) {
      const untested = Object.keys(methods).filter(m => !Object.keys(tested).includes(m));
      console.log("UNTESTED METHODS:", untested);
      throw e;
    }
  });
});
