var endpoints = require( "./endpoints" );
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
    options = util.merge( endpoints[key].defaults(), translateOptions( options ) );
    return getJSON( endpoints[key].url, options ).then( endpoints[key].transform );
  };
});

module.exports = api;
