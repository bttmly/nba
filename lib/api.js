"use strict";

var qs = require( "qs" );

var ep = require( "./endpoints" );
var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translate = util.partial( util.translateKeys, maps.twoWayMap() );

var recordedUrls = [];

var api = util.makeDict();
api._flags = { recordUrls: false };
api._recordedUrls = recordedUrls;

function recordUrl ( url, query ) {
  recordedUrls.push( url + "?" + qs.stringify( query ) );
}

Object.keys( ep ).forEach( function ( key ) {
  api[key] = function ( options ) {

    if ( options == null ) {
      options = {};
    }

    options = util.merge( ep[key].defaults(), translate( options ) );

    if ( api._flags.recordUrls ) {
      recordUrl( ep[key], options );
    }

    return getJSON( ep[key].url, options ).then( ep[key].transform );
  };
});

module.exports = api;
