"use strict";

process.env.TESTING = true;

var rewire = require("rewire");
var chai = require("chai");
var sinonChai = require("sinon-chai");
var should = chai.should();

chai.use(sinonChai);

var spy = require("./nba-api-spy");
var json = require("./get-json-stub");

var noop = Function();

var returnArg = function (a) { return a; };

var epStub = require("../lib/endpoints");
Object.keys(epStub).forEach(function (key) {
  epStub[key].transform = returnArg;
});

// a copy of API we can safely iterate (w/o rewire methods);
var api = rewire("../lib/api");

var successSpy = spy(json.success);

api.__set__("ep", epStub);
api.__set__("getJSON", successSpy);


describe(".playerProfile()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playerProfile(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerprofile").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.playerProfile({playerId: 1234}, function () {
      successSpy.lastCalledWithOption("PlayerID", 1234).should.equal(true);
      done();
    });
  });
});


describe(".playerInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playerInfo(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonplayerinfo").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.playerInfo({playerId: 1}, function () {
      successSpy.lastCalledWithOption("PlayerID", 1).should.equal(true);
      done();
    });
  });
});


describe(".playerSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playerSplits(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashboardbygeneralsplits").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.playerSplits({playerId: 2}, function () {
      successSpy.lastCalledWithOption("PlayerID", 2).should.equal(true);
      done();
    });
  });
});


describe(".playersInfo()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playersInfo(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonallplayers").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.playersInfo({season: "2013-14"}, noop);
    successSpy.lastCalledWithOption("Season", "2013-14").should.equal(true);
    done();
  });
});



describe(".teamStats()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamStats(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/leaguedashteamstats").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.teamStats({season: "2012-13"}, function () {
      successSpy.lastCalledWithOption("Season", "2012-13").should.equal(true);
      done();
    });
  });
});


describe(".teamSplits()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamSplits(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamdashboardbygeneralsplits").should.equal(true);
      done();
    });
  });

  it("should issue a request with the correct params", function (done) {
    api.teamSplits({season: "2011-12"}, function () {
      successSpy.lastCalledWithOption("Season", "2011-12").should.equal(true);
      done();
    });
  });
});


describe(".teamYears()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamYears(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamyears").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.teamYears({leagueId: "00"}, function () {
      successSpy.lastCalledWithOption("LeagueID", "00").should.equal(true);
      done();
    });
  });
});


describe(".shots()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.shots(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/shotchartdetail").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.shots({playerId: 3}, function () {
      successSpy.lastCalledWithOption("PlayerID", 3).should.equal(true);
      done();
    });
  });
});



describe(".scoreboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.scoreboard(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/scoreboard").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.scoreboard({gameDate: "12/25/2014"}, function () {
      successSpy.lastCalledWithOption("GameDate", "12/25/2014").should.equal(true);
      done();
    });
  });
});


describe(".playByPlay()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playByPlay(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playbyplay").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.playByPlay({gameId: 1}, function () {
      successSpy.lastCalledWithOption("GameID", 1).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreScoring()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.boxScoreScoring(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorescoring").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.boxScoreScoring({gameId: 2}, function () {
      successSpy.lastCalledWithOption("GameID", 2).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreUsage()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.boxScoreUsage(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreusage").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.boxScoreUsage({gameId: 3}, function () {
      successSpy.lastCalledWithOption("GameID", 3).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreMisc()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.boxScoreMisc(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoremisc").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.boxScoreMisc({gameId: 4}, function () {
      successSpy.lastCalledWithOption("GameID", 4).should.equal(true);
      done();
    });
  });
});


describe(".boxScoreAdvanced()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.boxScoreAdvanced(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscoreadvanced").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.boxScoreAdvanced({gameId: 5}, function () {
      successSpy.lastCalledWithOption("GameID", 5).should.equal(true);
      done();
    });
  });
});

describe(".boxScoreFourFactors()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.boxScoreFourFactors(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/boxscorefourfactors").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.boxScoreFourFactors({gameId: 6}, function () {
      successSpy.lastCalledWithOption("GameID", 6).should.equal(true);
      done();
    });
  });
});

describe(".teamHistoricalLeaders()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamHistoricalLeaders(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamhistoricalleaders").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.teamHistoricalLeaders({teamId: 7}, function () {
      successSpy.lastCalledWithOption("TeamID", 7).should.equal(true);
      done();
    });
  });
});

describe(".teamInfoCommon()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamInfoCommon(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teaminfocommon").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.teamInfoCommon({teamId: 8}, function () {
      successSpy.lastCalledWithOption("TeamID", 8).should.equal(true);
      done();
    });
  });
});

describe(".commonTeamRoster()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.commonTeamRoster(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/commonteamroster").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.commonTeamRoster({teamId: 9}, function () {
      successSpy.lastCalledWithOption("TeamID", 9).should.equal(true);
      done();
    });
  });
});

describe(".teamPlayerDashboard()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.teamPlayerDashboard(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/teamplayerdashboard").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.teamPlayerDashboard({teamId: 10}, function () {
      successSpy.lastCalledWithOption("TeamID", 10).should.equal(true);
      done();
    });
  });
});

describe(".playerDashPtShotLog()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playerDashPtShotLog(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptshotlog").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.playerDashPtShotLog({playerId: 11}, function () {
      successSpy.lastCalledWithOption("PlayerID", 11).should.equal(true);
      done();
    });
  });
});

describe(".playerDashPtReboundLogs()", function () {
  it("should issue a request to the correct URL", function (done) {
    api.playerDashPtReboundLogs(function () {
      successSpy.lastCalledWithUrl("http://stats.nba.com/stats/playerdashptreboundlogs").should.equal(true);
      done();
    });
  });
  it("should issue a request with the correct params", function (done) {
    api.playerDashPtReboundLogs({playerId: 12}, function () {
      successSpy.lastCalledWithOption("PlayerID", 12).should.equal(true);
      done();
    });
  });
});

describe("all endpoints", function () {
  Object.keys(api).forEach(function (key) {
    if (key[0] === "_"){
      return;
    }
    it("should call callback with error when passed a bad parameter", function (done) {
      api[key]({badParam: "xyz"}, function (err) {
        done();
        err.should.be.ok();
      });
    });
  });
});
