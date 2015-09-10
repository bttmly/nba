var stats = require("../../src/stats");

var steph = 201939;
var klay = 202691;
var dubs = 1610612744;

// this is an arbitrary actual game id
// Date: 2015-03-27 GSW at MEM
// Warriors 107 - Grizzlies 84
var gameId = "0021401082";

// for interactive inspection
global.StatsData = {};

describe("#playerProfile", function () {
  it("works", function (done) {
    stats.playerProfile({playerId: steph}, function (err, response) {
      global.StatsData.playerProfile = response;
      done(err);
    });
  });
});

describe("#playerInfo", function () {
  it("works", function (done) {
    stats.playerInfo({playerId: steph}, function (err, response) {
      global.StatsData.playerInfo = response;
      done(err);
    });
  });
});

describe("#playersInfo", function () {
  it("works", function (done) {
    stats.playersInfo(function (err, response) {
      global.StatsData.playersInfo = response;
      done(err);
    });
  });
});

describe("#teamStats", function () {
  it("works", function (done) {
    stats.teamStats(function (err, response) {
      global.StatsData.teamStats = response;
      done(err);
    });
  });
});

// transform or params needs work
describe("#teamSplits", function () {
  it("works", function (done) {
    stats.teamSplits({teamId: dubs}, function (err, response) {
      global.StatsData.teamSplits = response;
      done(err);
    });
  });
});

describe("#teamYears", function () {
  it("works", function (done) {
    stats.teamYears(function (err, response) {
      global.StatsData.teamYears = response;
      done(err);
    });
  });
});

// transform or params needs work
describe("#playerSplits", function () {
  it("works", function (done) {
    stats.playerSplits({playerId: klay}, function (err, response) {
      global.StatsData.playerSplits = response;
      done(err);
    });
  });
});

describe("#shots", function () {
  it("works", function (done) {
    stats.shots({teamId: dubs}, function (err, response) {
      global.StatsData.shots = response;
      done(err);
    });
  });
});

describe("#scoreboard", function () {
  it("works", function (done) {
    stats.scoreboard({gameDate: "03/27/2015"}, function (err, response) {
      global.StatsData.scoreboard = response;
      done(err);
    });
  });
});

describe("#playByPlay", function () {
  it("works", function (done) {
    stats.playByPlay({gameId}, function (err, response) {
      global.StatsData.playByPlay = response;
      done(err);
    });
  });
});


describe("#boxScoreScoring", function () {
  it("works", function (done) {
    stats.boxScoreScoring({gameId}, function (err, response) {
      global.StatsData.boxScoreScoring = response;
      done(err);
    });
  });
});

describe("#boxScoreUsage", function () {
  it("works", function (done) {
    stats.boxScoreUsage({gameId}, function (err, response) {
      global.StatsData.boxScoreUsage = response;
      done(err);
    });
  });
});

describe("#boxScoreMisc", function () {
  it("works", function (done) {
    stats.boxScoreMisc({gameId}, function (err, response) {
      global.StatsData.boxScoreMisc = response;
      done(err);
    });
  });
});

describe("#boxScoreAdvanced", function () {
  it("works", function (done) {
    stats.boxScoreAdvanced({gameId}, function (err, response) {
      global.StatsData.boxScoreAdvanced = response;
      done(err);
    });
  });
});

describe("#boxScoreFourFactors", function () {
  it("works", function (done) {
    stats.boxScoreFourFactors({gameId}, function (err, response) {
      global.StatsData.boxScoreFourFactors = response;
      done(err);
    });
  });
});

// no idea what `seasonId` is supposed to be -- Reponse says must be five digit number
describe("#teamHistoricalLeaders", function () {
  it("works", function (done) {
    stats.teamHistoricalLeaders({teamId: dubs, seasonId: "20078"}, function (err, response) {
      global.StatsData.teamHistoricalLeaders = response;
      done(err);
    });
  });
});

describe("#teamInfoCommon", function () {
  it("works", function (done) {
    stats.teamInfoCommon({teamId: dubs}, function (err, response) {
      global.StatsData.teamInfoCommon = response;
      done(err);
    });
  });
});

describe("#commonTeamRoster", function () {
  it("works", function (done) {
    stats.commonTeamRoster({teamId: dubs}, function (err, response) {
      global.StatsData.commonTeamRoster = response;
      done(err);
    });
  });
});

describe("#teamPlayerDashboard", function () {
  it("works", function (done) {
    stats.teamPlayerDashboard({teamId: dubs, seasonType: "Regular Season"}, function (err, response) {
      global.StatsData.teamPlayerDashboard = response;
      done(err);
    });
  });
});

describe("#playerDashPtShotLog", function () {
  it("works", function (done) {
    stats.playerDashPtShotLog({playerId: klay}, function (err, response) {
      global.StatsData.playerDashPtShotLog = response;
      done(err);
    });
  });
});

describe("#playerDashPtReboundLogs", function () {
  it("works", function (done) {
    stats.playerDashPtReboundLogs({playerId: klay}, function (err, response) {
      global.StatsData.playerDashPtReboundLogs = response;
      done(err);
    });
  });
});
