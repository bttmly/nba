"use strict";

require( "chai" ).should();

var rewire = require( "rewire" );

var json = require( "./get-json-stub" );
var epStub = require( "./endpoint-stub" );
var api = rewire( "../lib/api" );

api.__set__( "ep", epStub );
api.__set__( "getJSON", json.success );

describe( ".playerProfile()", function () {
  it( "should issue a request to the correct URL", function () {
    api.playerProfile();
    json.success.called.should.equal( true );
  });
});
