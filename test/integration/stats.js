const assert = require("assert");
const fs = require("fs");
const path = require("path");

const pify = require("pify");

const nba = require("../../src/").usePromises();

// for interactive inspection, particularly in browser
global.StatsData = {};
const tested = {};
const methods = {};

const set = (a, b, c) => (a[b] = c, a);

const stats = Object.keys(nba.stats).reduce((prox, k) => {
  methods[k] = true;
  return set(prox, k, (...args) => {
    tested[k] = true;
    return nba.stats[k](...args);
  });
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

  before(() => nba.stats.setTransport(require("../../src/get-json")));

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
  it("#boxScoreScoring", callMethod("boxScoreScoring", game));
  it("#boxScoreUsage", callMethod("boxScoreUsage", game));
  it("#boxScoreMisc", callMethod("boxScoreMisc", game));
  it("#boxScoreAdvanced", callMethod("boxScoreAdvanced", game));
  it("#boxScoreFourFactors", callMethod("boxScoreFourFactors", game));
  it("#teamHistoricalLeaders", callMethod("teamHistoricalLeaders", {teamId: _dubs, seasonId: "20078"}));
  it("#teamInfoCommon", callMethod("teamInfoCommon", dubs));
  it("#commonTeamRoster", callMethod("commonTeamRoster", dubs));
  it("#teamPlayerDashboard", callMethod("teamPlayerDashboard", {teamId: _dubs, seasonType: "Regular Season"}));
  it("#lineups", callMethod("lineups"));

  after(function () {
    Promise.all(Object.keys(global.StatsData).map(k =>
      pify(fs.writeFile)(path.join(__dirname, "../../responses", k + ".json"), JSON.stringify(global.StatsData[k], null, 2))
    ))
    .then(() => done())
    .catch(() => done());
  });
});

describe("tested all methods", function () {
  it("did test all methods", () => assert.deepEqual(tested, methods));
});