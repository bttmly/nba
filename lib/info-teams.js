var Promise = require( "es6-promise" ).Promise;
var extend = require( "extend" );

var getJSON = require( "./get-json" );
var maps = require( "./maps" );
var util = require( "./util" );

var TEAM_STAT_URL = "http://stats.nba.com/stats/leaguedashteamstats";
var TEAM_STAT_QUERY = extend( {}, maps.teamStatDefaults );

var TEAM_INFO_URL = "http://stats.nba.com/stats/commonteamyears";
var TEAM_INFO_QUERY = {
  "LeagueID": "00"
};

module.exports = function () {
  var statReq = getJSON( TEAM_STAT_URL, TEAM_STAT_QUERY );
  var infoReq = getJSON( TEAM_INFO_URL, TEAM_INFO_QUERY );
  return Promise.all([ statReq, infoReq ]).then( function ( responses ) {
    responses = responses.map( util.baseResponseTransform );
    return util.pickKeys( util.mergeCollections( "teamId", responses ),
      "teamId", "abbreviation", "teamName" );
  });
};
