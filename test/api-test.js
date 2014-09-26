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

// a copy of API we can safely iterate (w/o rewire methods);
var iterableApi = Object.keys( api ).reduce( function ( obj, key ) {
  if ( key !== "__set__" && key !== "__get__" && key !== "__with__" ) {
    obj[key] = api[key];
  }
  return obj;
}, {} );

describe( ".playerProfile()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerProfile();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/playerprofile" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.playerProfile({ playerId: 1234 });
    successSpy.lastCalledWithOption( "PlayerID", 1234 ).should.equal( true );
  });
});

describe( ".playerInfo()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerInfo();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonplayerinfo" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.playerInfo({ playerId: 1 });
    successSpy.lastCalledWithOption( "PlayerID", 1 ).should.equal( true );
  });
});

describe( ".playerSplits()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerSplits();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/playerdashboardbygeneralsplits" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.playerSplits({ playerId: 2 });
    successSpy.lastCalledWithOption( "PlayerID", 2 ).should.equal( true );
  });
});

describe( ".playersInfo()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playersInfo();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonallplayers" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.playersInfo({ season: "2013-14" });
    successSpy.lastCalledWithOption( "Season", "2013-14" ).should.equal( true );
  });
});

describe( ".teamStats()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamStats();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/leaguedashteamstats" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.teamStats({ season: "2012-13" });
    successSpy.lastCalledWithOption( "Season", "2012-13" ).should.equal( true );
  });
});

describe( ".teamSplits()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamSplits();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/teamdashboardbygeneralsplits" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.teamSplits({ season: "2011-12" });
    successSpy.lastCalledWithOption( "Season", "2011-12" ).should.equal( true );
  });
});

describe( ".teamYears()", function () {
  it( "should issue a request to the correct URL", function () {
    api.teamYears();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/commonteamyears" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.teamYears({ leagueId: "00" });
    successSpy.lastCalledWithOption( "LeagueID", "00" ).should.equal( true );
  });
});

describe( ".shots()", function () {
  it( "should issue a request to the correct URL", function () {
    api.shots();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/shotchartdetail" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.shots({ playerId: 3 });
    successSpy.lastCalledWithOption( "PlayerID", 3 ).should.equal( true );
  });
});


describe( ".scoreboard()", function () {
  it( "should issue a request to the correct URL", function () {
    api.scoreboard();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/scoreboard" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.scoreboard({ gameDate: "12/25/2014" });
    successSpy.lastCalledWithOption( "GameDate", "12/25/2014" ).should.equal( true );
  });
});

describe( ".playByPlay()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playByPlay();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/playbyplay" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.playByPlay({ gameId: 1 });
    successSpy.lastCalledWithOption( "GameID", 1 ).should.equal( true );
  });
});

describe( ".boxScoreScoring()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreScoring();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscorescoring" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreScoring({ gameId: 2 });
    successSpy.lastCalledWithOption( "GameID", 2 ).should.equal( true );
  });
});

describe( ".boxScoreUsage()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreUsage();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoreusage" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreUsage({ gameId: 3 });
    successSpy.lastCalledWithOption( "GameID", 3 ).should.equal( true );
  });
});

describe( ".boxScoreMisc()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreMisc();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoremisc" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreMisc({ gameId: 4 });
    successSpy.lastCalledWithOption( "GameID", 4 ).should.equal( true );
  });
});

describe( ".boxScoreAdvanced()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreAdvanced();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscoreadvanced" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreAdvanced({ gameId: 5 });
    successSpy.lastCalledWithOption( "GameID", 5 ).should.equal( true );
  });
});

describe( ".boxScoreFourFactors()", function () {
  it( "should issue a request to the correct URL", function () {
    api.boxScoreFourFactors();
    successSpy.lastCalledWithUrl( "http://stats.nba.com/stats/boxscorefourfactors" ).should.equal( true );
  });
  it( "should issue a request with the correct params", function () {
    api.boxScoreFourFactors({ gameId: 6 });
    successSpy.lastCalledWithOption( "GameID", 6 ).should.equal( true );
  });
});

describe( "all endpoints", function () {
  it( "should throw when passed a bad parameter", function () {
    Object.keys( iterableApi ).forEach( function ( key ) {
      var fn = function () {
        api[key]({ badParam: "xyz" });
      };
      fn.should.throw();
    });
  });
});
