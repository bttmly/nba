var SHOT_URL = "http://stats.nba.com/stats/playerdashboardbygeneralsplits";

var extend = require( "extend" );

var Promise = require( "./promise" );
var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var defaults = maps.playerSplitsDefaults;
var translateOptions = util.partial( util.translateKeys, maps.twoWayMap );

module.exports = function ( options ) {
  if ( options == null ) {
    options = {};
  }
  options = translateOptions( options );
  return getJSON( SHOT_URL, extend( {}, defaults, options ) )
    .then( util.baseResponseTransform );
};
