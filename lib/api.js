var endpoints = require( "./endpoints" );
var Promise = require( "./promise" );
var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translateOptions = util.partial( util.translateKeys, maps.twoWayMap() );

var api = {};

Object.keys( endpoints ).forEach( function ( key ) {
  api[key] = function ( options ) {
    if ( options == null ) {
      options = {};
    }
    options = Object.assign( endpoints[key].defaults(), translateOptions( options ) );
    return getJSON( endpoints[key].url, options ).then( util.generalResponseTransform );
  };
});

module.exports = api;
