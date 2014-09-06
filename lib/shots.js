var SHOT_URL = "http://stats.nba.com/stats/shotchartdetail";

var extend = require( 'extend' );
var Promise = require( 'es6-promise' ).Promise;

var maps = require( "./maps" );
var util = require( "./util" );
var get = require( "./get" );

var translateOptions = util.partial( util.translateKeys, maps.twoWayMap );

module.exports = function ( options ) {
  if ( options == null ) {
    options = {};
  }
  options = translateOptions( options );
  return get( SHOT_URL, extend( maps.shotDefaults, options ) )
    .then( function ( responseBody ) {
      var data = responseBody.resultSets[0];
      var headers = util.jsifyHeaders( data.headers );
      return util.collectify( headers, data.rowSet );
    });
};
