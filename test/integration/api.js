var nba = require("../..");

var steph = 201939;
var klay = 202691;
var dubs = 1610612744;

describe("#playerProfile", function () {
  it("works", function (done) {
    nba.api.playerProfile({playerId: steph}, function (err, response) {
      done(err);
    });
  });
});

describe("#playerInfo", function () {
  it("works", function (done) {
    nba.api.playerInfo({playerId: steph}, function (err, response) {
      done(err);
    });
  });
});

describe("#playersInfo", function () {
  it("works", function (done) {
    nba.api.playersInfo(function (err, response) {
      done(err);
    });
  });
});

describe("#teamStats", function () {
  it("works", function (done) {
    nba.api.teamStats(function (err, response) {
      done(err);
    });
  });
});

// transform or params needs work
describe("#teamSplits", function () {
  it("works", function (done) {
    nba.api.teamSplits({teamId: dubs}, function (err, response) {
      done(err);
    });
  });
});

describe("#teamYears", function () {
  it("works", function (done) {
    nba.api.teamYears(function (err, response) {
      done(err);
    });
  });
});

// transform or params needs work
describe("#playerSplits", function () {
  it("works", function (done) {
    nba.api.playerSplits({playerId: klay}, function (err, response) {
      done(err);
    });
  });
});

describe("#shots", function () {
  it("works", function (done) {
    nba.api.shots({teamId: dubs}, function (err, response) {
      done(err);
    });
  });
});

describe("#scoreboard", function () {
  it("works", function (done) {
    nba.api.scoreboard({gameDate: "03/27/2015"}, function (err, response) {
      done(err);
    });
  });
});

describe("#playByPlay", function () {
  it("works", function (done) {
    nba.api.playByPlay({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});


describe("#boxScoreScoring", function () {
  it("works", function (done) {
    nba.api.boxScoreScoring({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});

describe("#boxScoreUsage", function () {
  it("works", function (done) {
    nba.api.boxScoreUsage({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});

describe("#boxScoreMisc", function () {
  it("works", function (done) {
    nba.api.boxScoreMisc({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});

describe("#boxScoreAdvanced", function () {
  it("works", function (done) {
    nba.api.boxScoreAdvanced({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});

describe("#boxScoreFourFactors", function () {
  it("works", function (done) {
    nba.api.boxScoreFourFactors({gameId: "0021401082"}, function (err, response) {
      done(err);
    });
  });
});

// no idea what `seasonId` is supposed to be -- Reponse says must be five digit number
describe("#teamHistoricalLeaders", function () {
  it("works", function (done) {
    nba.api.teamHistoricalLeaders({teamId: dubs, seasonId: "20078"}, function (err, response) {
      done(err);
    });
  });
});

describe("#teamInfoCommon", function () {
  it("works", function (done) {
    nba.api.teamInfoCommon({teamId: dubs}, function (err, response) {
      done(err);
    });
  });
});

describe("#commonTeamRoster", function () {
  it("works", function (done) {
    nba.api.commonTeamRoster({teamId: dubs}, function (err, response) {
      done(err);
    });
  });
});

describe("#teamPlayerDashboard", function () {
  it("works", function (done) {
    nba.api.teamPlayerDashboard({teamId: dubs, seasonType: "Regular Season"}, function (err, response) {
      done(err);
    });
  });
});

describe("#playerDashPtShotLog", function () {
  it("works", function (done) {
    nba.api.playerDashPtShotLog({playerId: klay}, function (err, response) {
      done(err);
    });
  });
});

describe("#playerDashPtReboundLogs", function () {
  it("works", function (done) {
    nba.api.playerDashPtReboundLogs({playerId: klay}, function (err, response) {
      done(err);
    });
  });
});
