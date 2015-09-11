"use strict";

process.env.NODE_ENV = "testing";

const expect = require("must");
delete Object.prototype.must; // argh.

const spy = require("../nba-api-spy");
const json = require("../get-json-stub");

const noop = () => {};
const returnArg = a => a;

// a copy of stats we can safely iterate (w/o rewire methods);
const stats = require("../../src/stats");

const successSpy = spy(json.success);

stats.setTransport(successSpy);

describe("#playerProfile()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playerProfile(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerprofile")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.playerProfile({playerId: 1234}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 1234)).to.equal(true);
      done();
    });
  });
});


describe("#playerInfo()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playerInfo(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonplayerinfo")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.playerInfo({playerId: 1}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 1)).to.equal(true);
      done();
    });
  });
});


describe("#playerSplits()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playerSplits(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashboardbygeneralsplits")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.playerSplits({playerId: 2}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 2)).to.equal(true);
      done();
    });
  });
});


describe("#playersInfo()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playersInfo(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonallplayers")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.playersInfo({season: "2013-14"}, noop);
    expect(successSpy.lastCalledWithOption("Season", "2013-14")).to.equal(true);
    done();
  });
});



describe("#teamStats()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamStats(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/leaguedashteamstats")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.teamStats({season: "2012-13"}, () => {
      expect(successSpy.lastCalledWithOption("Season", "2012-13")).to.equal(true);
      done();
    });
  });
});


describe("#teamSplits()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamSplits(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamdashboardbygeneralsplits")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", done => {
    stats.teamSplits({season: "2011-12"}, () => {
      expect(successSpy.lastCalledWithOption("Season", "2011-12")).to.equal(true);
      done();
    });
  });
});


describe("#teamYears()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamYears(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamyears")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.teamYears({leagueId: "00"}, () => {
      expect(successSpy.lastCalledWithOption("LeagueID", "00")).to.equal(true);
      done();
    });
  });
});


describe("#shots()", () => {
  it("should issue a request to the correct URL", done => {
    stats.shots(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/shotchartdetail")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.shots({playerId: 3}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 3)).to.equal(true);
      done();
    });
  });
});



describe("#scoreboard()", () => {
  it("should issue a request to the correct URL", done => {
    stats.scoreboard(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/scoreboard")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.scoreboard({gameDate: "12/25/2014"}, () => {
      expect(successSpy.lastCalledWithOption("gameDate", "12/25/2014")).to.equal(true);
      done();
    });
  });
});


describe("#playByPlay()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playByPlay(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playbyplay")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.playByPlay({gameId: 1}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 1)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreScoring()", () => {
  it("should issue a request to the correct URL", done => {
    stats.boxScoreScoring(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorescoring")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.boxScoreScoring({gameId: 2}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 2)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreUsage()", () => {
  it("should issue a request to the correct URL", done => {
    stats.boxScoreUsage(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreusage")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.boxScoreUsage({gameId: 3}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 3)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreMisc()", () => {
  it("should issue a request to the correct URL", done => {
    stats.boxScoreMisc(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoremisc")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.boxScoreMisc({gameId: 4}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 4)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreAdvanced()", () => {
  it("should issue a request to the correct URL", done => {
    stats.boxScoreAdvanced(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreadvanced")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.boxScoreAdvanced({gameId: 5}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 5)).to.equal(true);
      done();
    });
  });
});

describe("#boxScoreFourFactors()", () => {
  it("should issue a request to the correct URL", done => {
    stats.boxScoreFourFactors(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorefourfactors")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.boxScoreFourFactors({gameId: 6}, () => {
      expect(successSpy.lastCalledWithOption("GameID", 6)).to.equal(true);
      done();
    });
  });
});

describe("#teamHistoricalLeaders()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamHistoricalLeaders(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamhistoricalleaders")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.teamHistoricalLeaders({teamId: 7}, () => {
      expect(successSpy.lastCalledWithOption("TeamID", 7)).to.equal(true);
      done();
    });
  });
});

describe("#teamInfoCommon()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamInfoCommon(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teaminfocommon")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.teamInfoCommon({teamId: 8}, () => {
      expect(successSpy.lastCalledWithOption("TeamID", 8)).to.equal(true);
      done();
    });
  });
});

describe("#commonTeamRoster()", () => {
  it("should issue a request to the correct URL", done => {
    stats.commonTeamRoster(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamroster")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.commonTeamRoster({teamId: 9}, () => {
      expect(successSpy.lastCalledWithOption("TeamID", 9)).to.equal(true);
      done();
    });
  });
});

describe("#teamPlayerDashboard()", () => {
  it("should issue a request to the correct URL", done => {
    stats.teamPlayerDashboard(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamplayerdashboard")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.teamPlayerDashboard({teamId: 10}, () => {
      expect(successSpy.lastCalledWithOption("TeamID", 10)).to.equal(true);
      done();
    });
  });
});

describe("#playerDashPtShotLog()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playerDashPtShotLog(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptshotlog")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.playerDashPtShotLog({playerId: 11}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 11)).to.equal(true);
      done();
    });
  });
});

describe("#playerDashPtReboundLogs()", () => {
  it("should issue a request to the correct URL", done => {
    stats.playerDashPtReboundLogs(() => {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptreboundlogs")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", done => {
    stats.playerDashPtReboundLogs({playerId: 12}, () => {
      expect(successSpy.lastCalledWithOption("PlayerID", 12)).to.equal(true);
      done();
    });
  });
});

describe("all endpoints", () => {
  Object.keys(stats).forEach(key => {
    it("should THROW an error when passed a bad parameter", () => {
      expect(() => stats[key]({badParam: "xyz"}, noop)).to.throw();
    });
  });
});

describe("failing", () => {

});