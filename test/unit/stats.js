"use strict";

process.env.NODE_ENV = "testing";

var expect = require("must");
delete Object.prototype.must; // argh.

var spy = require("../nba-api-spy");
var json = require("../get-json-stub");

var noop = Function();
var returnArg = function (a) { return a; };

// a copy of stats we can safely iterate (w/o rewire methods);
var stats = require("../../src/stats");

var successSpy = spy(json.success);

stats.setTransport(successSpy);

describe("#playerProfile()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerProfile(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerprofile")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerProfile({playerId: 1234}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 1234)).to.equal(true);
      done();
    });
  });
});


describe("#playerInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerInfo(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonplayerinfo")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerInfo({playerId: 1}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 1)).to.equal(true);
      done();
    });
  });
});


describe("#playerSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerSplits(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashboardbygeneralsplits")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerSplits({playerId: 2}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 2)).to.equal(true);
      done();
    });
  });
});


describe("#playersInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playersInfo(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonallplayers")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playersInfo({season: "2013-14"}, noop);
    expect(successSpy.lastCalledWithOption("Season", "2013-14")).to.equal(true);
    done();
  });
});



describe("#teamStats()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamStats(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/leaguedashteamstats")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.teamStats({season: "2012-13"}, function () {
      expect(successSpy.lastCalledWithOption("Season", "2012-13")).to.equal(true);
      done();
    });
  });
});


describe("#teamSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamSplits(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamdashboardbygeneralsplits")).to.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.teamSplits({season: "2011-12"}, function () {
      expect(successSpy.lastCalledWithOption("Season", "2011-12")).to.equal(true);
      done();
    });
  });
});


describe("#teamYears()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamYears(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamyears")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamYears({leagueId: "00"}, function () {
      expect(successSpy.lastCalledWithOption("LeagueID", "00")).to.equal(true);
      done();
    });
  });
});


describe("#shots()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.shots(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/shotchartdetail")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.shots({playerId: 3}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 3)).to.equal(true);
      done();
    });
  });
});



describe("#scoreboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.scoreboard(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/scoreboard")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.scoreboard({gameDate: "12/25/2014"}, function () {
      expect(successSpy.lastCalledWithOption("gameDate", "12/25/2014")).to.equal(true);
      done();
    });
  });
});


describe("#playByPlay()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playByPlay(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playbyplay")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playByPlay({gameId: 1}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 1)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreScoring()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreScoring(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorescoring")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreScoring({gameId: 2}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 2)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreUsage()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreUsage(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreusage")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreUsage({gameId: 3}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 3)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreMisc()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreMisc(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoremisc")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreMisc({gameId: 4}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 4)).to.equal(true);
      done();
    });
  });
});


describe("#boxScoreAdvanced()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreAdvanced(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreadvanced")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreAdvanced({gameId: 5}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 5)).to.equal(true);
      done();
    });
  });
});

describe("#boxScoreFourFactors()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreFourFactors(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorefourfactors")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreFourFactors({gameId: 6}, function () {
      expect(successSpy.lastCalledWithOption("GameID", 6)).to.equal(true);
      done();
    });
  });
});

describe("#teamHistoricalLeaders()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamHistoricalLeaders(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamhistoricalleaders")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamHistoricalLeaders({teamId: 7}, function () {
      expect(successSpy.lastCalledWithOption("TeamID", 7)).to.equal(true);
      done();
    });
  });
});

describe("#teamInfoCommon()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamInfoCommon(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teaminfocommon")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamInfoCommon({teamId: 8}, function () {
      expect(successSpy.lastCalledWithOption("TeamID", 8)).to.equal(true);
      done();
    });
  });
});

describe("#commonTeamRoster()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.commonTeamRoster(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamroster")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.commonTeamRoster({teamId: 9}, function () {
      expect(successSpy.lastCalledWithOption("TeamID", 9)).to.equal(true);
      done();
    });
  });
});

describe("#teamPlayerDashboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamPlayerDashboard(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamplayerdashboard")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamPlayerDashboard({teamId: 10}, function () {
      expect(successSpy.lastCalledWithOption("TeamID", 10)).to.equal(true);
      done();
    });
  });
});

describe("#playerDashPtShotLog()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerDashPtShotLog(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptshotlog")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playerDashPtShotLog({playerId: 11}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 11)).to.equal(true);
      done();
    });
  });
});

describe("#playerDashPtReboundLogs()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerDashPtReboundLogs(function () {
      expect(successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptreboundlogs")).to.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playerDashPtReboundLogs({playerId: 12}, function () {
      expect(successSpy.lastCalledWithOption("PlayerID", 12)).to.equal(true);
      done();
    });
  });
});

describe("all endpoints", function () {
  Object.keys(stats).forEach(function (key) {
    it("should THROW an error when passed a bad parameter", function () {
      (function () { stats[key]({badParam: "xyz"}, noop) }).should.throw()
    });
  });
});

describe("failing", function () {

});