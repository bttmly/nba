"use strict";

var rewire = require( "rewire" );
var chai = require( "chai" );
var sinonChai = require( "sinon-chai" );
chai.should();
chai.use( sinonChai );

var spy = require( "./nba-api-spy" );
var json = require( "./get-json-stub" );
var epStub = require( "./endpoint-stub" );
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
