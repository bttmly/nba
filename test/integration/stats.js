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

describe("#playerProfile", () => {
  it("works", done => {
    stats.playerProfile({playerId: steph}, (err, response) => {
      global.StatsData.playerProfile = response;
      done(err);
    });
  });
});

describe("#playerInfo", () => {
  it("works", done => {
    stats.playerInfo({playerId: steph}, (err, response) => {
      global.StatsData.playerInfo = response;
      done(err);
    });
  });
});

describe("#playersInfo", () => {
  it("works", done => {
    stats.playersInfo((err, response) => {
      global.StatsData.playersInfo = response;
      done(err);
    });
  });
});

describe("#teamStats", () => {
  it("works", done => {
    stats.teamStats((err, response) => {
      global.StatsData.teamStats = response;
      done(err);
    });
  });
});

// transform or params needs work
describe("#teamSplits", () => {
  it("works", done => {
    stats.teamSplits({teamId: dubs}, (err, response) => {
      global.StatsData.teamSplits = response;
      done(err);
    });
  });
});

describe("#teamYears", () => {
  it("works", done => {
    stats.teamYears((err, response) => {
      global.StatsData.teamYears = response;
      done(err);
    });
  });
});

// transform or params needs work
describe("#playerSplits", () => {
  it("works", done => {
    stats.playerSplits({playerId: klay}, (err, response) => {
      global.StatsData.playerSplits = response;
      done(err);
    });
  });
});

describe("#shots", () => {
  it("works", done => {
    stats.shots({teamId: dubs}, (err, response) => {
      global.StatsData.shots = response;
      done(err);
    });
  });
});

describe("#scoreboard", () => {
  it("works", done => {
    stats.scoreboard({gameDate: "03/27/2015"}, (err, response) => {
      global.StatsData.scoreboard = response;
      done(err);
    });
  });
});

describe("#playByPlay", () => {
  it("works", done => {
    stats.playByPlay({gameId}, (err, response) => {
      global.StatsData.playByPlay = response;
      done(err);
    });
  });
});


describe("#boxScoreScoring", () => {
  it("works", done => {
    stats.boxScoreScoring({gameId}, (err, response) => {
      global.StatsData.boxScoreScoring = response;
      done(err);
    });
  });
});

describe("#boxScoreUsage", () => {
  it("works", done => {
    stats.boxScoreUsage({gameId}, (err, response) => {
      global.StatsData.boxScoreUsage = response;
      done(err);
    });
  });
});

describe("#boxScoreMisc", () => {
  it("works", done => {
    stats.boxScoreMisc({gameId}, (err, response) => {
      global.StatsData.boxScoreMisc = response;
      done(err);
    });
  });
});

describe("#boxScoreAdvanced", () => {
  it("works", done => {
    stats.boxScoreAdvanced({gameId}, (err, response) => {
      global.StatsData.boxScoreAdvanced = response;
      done(err);
    });
  });
});

describe("#boxScoreFourFactors", () => {
  it("works", done => {
    stats.boxScoreFourFactors({gameId}, (err, response) => {
      global.StatsData.boxScoreFourFactors = response;
      done(err);
    });
  });
});

// no idea what `seasonId` is supposed to be -- Reponse says must be five digit number
describe("#teamHistoricalLeaders", () => {
  it("works", done => {
    stats.teamHistoricalLeaders({teamId: dubs, seasonId: "20078"}, (err, response) => {
      global.StatsData.teamHistoricalLeaders = response;
      done(err);
    });
  });
});

describe("#teamInfoCommon", () => {
  it("works", done => {
    stats.teamInfoCommon({teamId: dubs}, (err, response) => {
      global.StatsData.teamInfoCommon = response;
      done(err);
    });
  });
});

describe("#commonTeamRoster", () => {
  it("works", done => {
    stats.commonTeamRoster({teamId: dubs}, (err, response) => {
      global.StatsData.commonTeamRoster = response;
      done(err);
    });
  });
});

describe("#teamPlayerDashboard", () => {
  it("works", done => {
    stats.teamPlayerDashboard({teamId: dubs, seasonType: "Regular Season"}, (err, response) => {
      global.StatsData.teamPlayerDashboard = response;
      done(err);
    });
  });
});

describe("#playerDashPtShotLog", () => {
  it("works", done => {
    stats.playerDashPtShotLog({playerId: klay}, (err, response) => {
      global.StatsData.playerDashPtShotLog = response;
      done(err);
    });
  });
});

describe("#playerDashPtReboundLogs", () => {
  it("works", done => {
    stats.playerDashPtReboundLogs({playerId: klay}, (err, response) => {
      global.StatsData.playerDashPtReboundLogs = response;
      done(err);
    });
  });
});
