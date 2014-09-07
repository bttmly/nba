var Promise = require( "es6-promise" ).Promise;

var get = require( "./get" );
var maps = require( "./maps" );
var util = require( "./util" );
var teamInfo = require( "./team-info" );

var TEAM_STAT_URL = "http://stats.nba.com/stats/leaguedashteamstats";
var TEAM_STAT_QUERY = util.shallowCopy( maps.teamStatDefaults );

var TEAM_INFO_URL = "http://stats.nba.com/stats/commonteamyears";
var TEAM_INFO_QUERY = {
  "LeagueID": "00"
};

module.exports = (function () {
  var statReq = get( TEAM_STAT_URL, TEAM_STAT_QUERY );
  var infoReq = get( TEAM_INFO_URL, TEAM_INFO_QUERY );
  var promise = Promise.all([ statReq, infoReq ]).then( function ( responses ) {
    responses = responses.map( util.baseResponseTransform );
    return util.pickKeys( util.mergeCollections( "teamId", responses ),
      "teamId", "abbreviation", "teamName" );
  });
  return function () { return promise; };
})();
