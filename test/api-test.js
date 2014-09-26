"use strict";

var rewire = require( "rewire" );
var chai = require( "chai" );
var sinonChai = require( "sinon-chai" );
chai.should();
chai.use( sinonChai );

var spy = require( "./nba-api-spy" );
var json = require( "./get-json-stub" );

var epStub = require( "../lib/endpoints" );
Object.keys( epStub ).forEach( function ( key ) {
  epStub[key].transform = function ( a ) { return a; };
});

var api = rewire( "../lib/api" );
var successSpy = spy( json.success );

api.__set__( "ep", epStub );
api.__set__( "getJSON", successSpy );

describe( ".playerProfile()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerProfile();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/playerprofile" );
  });
  it( "should issue a request with the correct params", function () {
    api.playerProfile({ playerId: 1234 });
    successSpy.lastCalledWithOption( "PlayerID", 1234 );
  });
});

describe( ".playerInfo()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerInfo();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonplayerinfo" );
  });
  it( "should issue a request with the correct params", function () {
    api.playerInfo({ playerId: 1 });
    successSpy.lastCalledWithOption( "PlayerID", 1 );
  });
});

describe( ".playerSplits()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerSplits();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonplayerinfo" );
  });
  it( "should issue a request with the correct params", function () {
    api.playerSplits({ playerId: 2 });
    successSpy.lastCalledWithOption( "PlayerID", 2 );
  });
});

describe( ".playersInfo()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playersInfo();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonallplayers" );
  });
  it( "should issue a request with the correct params", function () {
    api.playersInfo({ season: "2013-14" });
    successSpy.lastCalledWithOption( "Season", "2013-14" );
  });
});

describe( ".teamStats()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamStats();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/leaguedashteamstats" );
  });
  it( "should issue a request with the correct params", function () {
    api.teamStats({ season: "2012-13" });
    successSpy.lastCalledWithOption( "Season", "2012-13" );
  });
});

describe( ".teamSplits()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamSplits();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/teamdashboardbygeneralsplits" );
  });
  it( "should issue a request with the correct params", function () {
    api.teamSplits({ season: "2011-12" });
    successSpy.lastCalledWithOption( "Season", "2011-12" );
  });
});

describe( ".teamYears()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamYears();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonteamyears" );
  });
  it( "should issue a request with the correct params", function () {
    api.teamYears({ leagueId: "00" });
    successSpy.lastCalledWithOption( "LeagueID", "00" );
  });
});

describe( ".shots()", function () {
  it( "should issue a request to the correct URL", function () {
    api.shots();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/shotchartdetail" );
  });
  it( "should issue a request with the correct params", function () {
    api.shots({ playerId: 3 });
    successSpy.lastCalledWithOption( "PlayerID", 3 );
  });
});


describe( ".scoreboard()", function () {
  it( "should issue a request to the correct URL", function () {
    api.scoreboard();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/scoreboard" );
  });
  it( "should issue a request with the correct params", function () {
    api.scoreboard({ gameDate: "12/25/2014" });
    successSpy.lastCalledWithOption( "GameDate", "12/25/2014" );
  });
});

describe( ".playByPlay()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playByPlay();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/playbyplay" );
  });
  it( "should issue a request with the correct params", function () {
    api.playByPlay({ gameId: 1 });
    successSpy.lastCalledWithOption( "GameID", 1 );
  });
});

describe( ".boxScoreScoring()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreScoring();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscorescoring" );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreScoring({ gameId: 2 });
    successSpy.lastCalledWithOption( "GameID", 2 );
  });
});

describe( ".boxScoreUsage()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreUsage();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoreusage" );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreUsage({ gameId: 3 });
    successSpy.lastCalledWithOption( "GameID", 3 );
  });
});

describe( ".boxScoreMisc()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreMisc();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoremisc" );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreMisc({ gameId: 4 });
    successSpy.lastCalledWithOption( "GameID", 4 );
  });
});

describe( ".boxScoreAdvanced()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreAdvanced();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoreadvanced" );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreAdvanced({ gameId: 5 });
    successSpy.lastCalledWithOption( "GameID", 5 );
  });
});

describe( ".boxScoreFourFactors()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreFourFactors();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscorefourfactors" );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreFourFactors({ gameId: 6 });
    successSpy.lastCalledWithOption( "GameID", 6 );
  });
});
