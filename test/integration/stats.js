const fs = require("fs");
const path = require("path");

const nba = require("../../");
const get = require("lodash.get");
const responses = {};
const tested = {};
const notTested = ["withTransport"];

// stub for now, will add response shape verification for self-documenting responses
const verifyShape = (shape, response) => response;

const callMethod = (name, params = {}, shape) => async () => {
  tested[name] = true;
  const method = nba.stats[name];
  const r = await method(params);
  verifyShape(shape, r);

  // special case, maximum call stack size exceeded
  const items = get(r, ["resultSets", 0, "rowSet"]);
  if (items && items.length > 500) {
    r.resultSets[0].rowSet = items.slice(0, 500);
  }

  responses[name] = r;
};

const _steph = 201939;
const _dubs = 1610612744;
const steph = { PlayerID: _steph };
const dubs = { TeamID: _dubs };
const game = { GameID: "0021401082" };

// these tests merely ensure that valid stats API calls don't error.

const delay = ms => new Promise(r => setTimeout(r, ms));

describe("nba stats methods", function () {

  // it seems like we get throttled or blacklisted if we send these requests too quickly
  afterEach(async () => {
    console.log("delay 3s");
    await delay(3000);
  });

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
  it("#teamHustle", callMethod("teamHustle", { TeamID: _dubs }));
  it("#leagueStandings", callMethod("leagueStandings"));
  it("#teamPlayerOnOffDetails", callMethod("teamPlayerOnOffDetails", { TeamID: _dubs }));
  it("#playerCompare", callMethod("playerCompare", { PlayerIDList: _steph, VsPlayerIDList: _steph }));


  after(() => {
    if (!process.env.WRITE_RESPONSES) return;
    try {
      fs.mkdirSync(path.join(__dirname, "../responses"));
    } catch (err) {}

    for (const [method, response] of Object.entries(responses)) {
      fs.writeFileSync(
        path.join(__dirname, "../responses", `stats_${method}.json`),
        JSON.stringify(response, null, 2),
      );
    }
  });
});

describe("tested all methods", function () {
  it("did test all methods", () => {
    const untested = [];
    for (const method of Object.keys(nba.stats)) {
      if (notTested.includes(method)) continue;
      if (!tested[method]) untested.push(method);
    }
    if (untested.length) {
      console.log("UNTESTED METHODS:", untested);
      throw new Error("didn't test all stats methods");
    }
  });
});
