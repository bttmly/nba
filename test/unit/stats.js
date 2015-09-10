"use strict";

process.env.NODE_ENV = "testing";

var rewire = require("rewire");
var chai = require("chai");
var sinonChai = require("sinon-chai");
var should = chai.should();

chai.use(sinonChai);

var spy = require("../nba-api-spy");
var json = require("../get-json-stub");

var noop = Function();
var returnArg = function (a) { return a; };

// a copy of stats we can safely iterate (w/o rewire methods);
var stats = require("../../src/stats");

var successSpy = spy(json.success);

stats.setTransport(successSpy);

describe(".playerProfile()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerProfile(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerprofile").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerProfile({playerId: 1234}, function () {
      successSpy.lastCalledWithOption("PlayerID", 1234).should.equal(true);
      done();
    });
  });
});


describe(".playerInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerInfo(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonplayerinfo").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerInfo({playerId: 1}, function () {
      successSpy.lastCalledWithOption("PlayerID", 1).should.equal(true);
      done();
    });
  });
});


describe(".playerSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerSplits(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashboardbygeneralsplits").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playerSplits({playerId: 2}, function () {
      successSpy.lastCalledWithOption("PlayerID", 2).should.equal(true);
      done();
    });
  });
});


describe(".playersInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playersInfo(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonallplayers").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.playersInfo({season: "2013-14"}, noop);
    successSpy.lastCalledWithOption("Season", "2013-14").should.equal(true);
    done();
  });
});



describe(".teamStats()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamStats(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/leaguedashteamstats").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.teamStats({season: "2012-13"}, function () {
      successSpy.lastCalledWithOption("Season", "2012-13").should.equal(true);
      done();
    });
  });
});


describe(".teamSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamSplits(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamdashboardbygeneralsplits").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    stats.teamSplits({season: "2011-12"}, function () {
      successSpy.lastCalledWithOption("Season", "2011-12").should.equal(true);
      done();
    });
  });
});


describe(".teamYears()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamYears(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamyears").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamYears({leagueId: "00"}, function () {
      successSpy.lastCalledWithOption("LeagueID", "00").should.equal(true);
      done();
    });
  });
});


describe(".shots()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.shots(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/shotchartdetail").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.shots({playerId: 3}, function () {
      successSpy.lastCalledWithOption("PlayerID", 3).should.equal(true);
      done();
    });
  });
});



describe(".scoreboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.scoreboard(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/scoreboard").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.scoreboard({gameDate: "12/25/2014"}, function () {
      successSpy.lastCalledWithOption("gameDate", "12/25/2014").should.equal(true);
      done();
    });
  });
});


describe(".playByPlay()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playByPlay(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playbyplay").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playByPlay({gameId: 1}, function () {
      successSpy.lastCalledWithOption("GameID", 1).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreScoring()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreScoring(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorescoring").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreScoring({gameId: 2}, function () {
      successSpy.lastCalledWithOption("GameID", 2).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreUsage()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreUsage(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreusage").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreUsage({gameId: 3}, function () {
      successSpy.lastCalledWithOption("GameID", 3).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreMisc()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreMisc(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoremisc").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreMisc({gameId: 4}, function () {
      successSpy.lastCalledWithOption("GameID", 4).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreAdvanced()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreAdvanced(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreadvanced").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreAdvanced({gameId: 5}, function () {
      successSpy.lastCalledWithOption("GameID", 5).should.equal(true);
      done();
    });
  });
});

describe(".boxScoreFourFactors()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.boxScoreFourFactors(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorefourfactors").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.boxScoreFourFactors({gameId: 6}, function () {
      successSpy.lastCalledWithOption("GameID", 6).should.equal(true);
      done();
    });
  });
});

describe(".teamHistoricalLeaders()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamHistoricalLeaders(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamhistoricalleaders").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamHistoricalLeaders({teamId: 7}, function () {
      successSpy.lastCalledWithOption("TeamID", 7).should.equal(true);
      done();
    });
  });
});

describe(".teamInfoCommon()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamInfoCommon(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teaminfocommon").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamInfoCommon({teamId: 8}, function () {
      successSpy.lastCalledWithOption("TeamID", 8).should.equal(true);
      done();
    });
  });
});

describe(".commonTeamRoster()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.commonTeamRoster(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamroster").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.commonTeamRoster({teamId: 9}, function () {
      successSpy.lastCalledWithOption("TeamID", 9).should.equal(true);
      done();
    });
  });
});

describe(".teamPlayerDashboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.teamPlayerDashboard(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamplayerdashboard").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.teamPlayerDashboard({teamId: 10}, function () {
      successSpy.lastCalledWithOption("TeamID", 10).should.equal(true);
      done();
    });
  });
});

describe(".playerDashPtShotLog()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerDashPtShotLog(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptshotlog").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playerDashPtShotLog({playerId: 11}, function () {
      successSpy.lastCalledWithOption("PlayerID", 11).should.equal(true);
      done();
    });
  });
});

describe(".playerDashPtReboundLogs()", function () {
  it("should issue a request to the correct URL", function (done) {
    stats.playerDashPtReboundLogs(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptreboundlogs").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    stats.playerDashPtReboundLogs({playerId: 12}, function () {
      successSpy.lastCalledWithOption("PlayerID", 12).should.equal(true);
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
