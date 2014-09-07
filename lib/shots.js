var SHOT_URL = "http://stats.nba.com/stats/shotchartdetail";

var extend = require( 'extend' );
var Promise = require( 'es6-promise' ).Promise;

var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translateOptions = util.partial( util.translateKeys, maps.twoWayMap );

module.exports = function ( options ) {
  if ( options == null ) {
    options = {};
  }
  options = translateOptions( options );
  return getJSON( SHOT_URL, extend( {}, maps.shotDefaults, options ) )
    .then( util.baseResponseTransform );
};
