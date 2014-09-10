var getJSON = require( "./get-json" );
var util = require( "./util" );

var CURRENT_SEASON = "2014-15";
var PLAYERS_URL = "http://stats.nba.com/stats/commonallplayers/";

var query = {
  LeagueID: "00",
  IsOnlyCurrentSeason: "1",
  Season: CURRENT_SEASON
};

var api = require( "./api" );

module.exports = function() {
  return api.playersInfo()
  // return getJSON( PLAYERS_URL, query ).then( function ( resp ) {
  //   return util.playersResponseTransform( resp );
  // });
};
