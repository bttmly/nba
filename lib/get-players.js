var get = require( "./get" );
var util = require( "./util" );
var playerInfo = require( "./player-info" );

var CURRENT_SEASON = "2014-15";
var PLAYERS_URL = "http://stats.nba.com/stats/commonallplayers/";

var query = {
  LeagueID: "00",
  IsOnlyCurrentSeason: "1",
  Season: CURRENT_SEASON
};

module.exports = (function() {
  var promise = get( PLAYERS_URL, query ).then( function ( resp ) {
    return util.playersResponseTransform( resp );
  });
  return function () { return promise; };
})();
