var get = require( "./get" );
var util = require( "./util" );

var CURRENT_SEASON = "2014-15";
var PLAYERS_URL = "http://stats.nba.com/stats/commonallplayers/";

var query = {
  LeagueID: "00",
  IsOnlyCurrentSeason: "1",
  Season: CURRENT_SEASON
};

module.exports = function () {
  return get( PLAYERS_URL, query ).then( util.playersResponseTransform );
};
