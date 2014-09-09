var Promise = require( "./promise" );

var getJSON = require( "./get-json" );
var maps = require( "./maps" );
var util = require( "./util" );

var TEAM_STAT_URL = "http://stats.nba.com/stats/leaguedashteamstats";
var TEAM_STAT_QUERY = maps.teamStatDefaults();

var TEAM_INFO_URL = "http://stats.nba.com/stats/commonteamyears";
var TEAM_INFO_QUERY = {
  "LeagueID": "00"
};

var TWO_WORD_TEAMS = {
  "Portland Trail Blazers": true
};

// adds location and short name data to team objects.
function addExtraTeamData ( team ) {
  team.teamName = team.teamName.trim();
  var splitted = team.teamName.split( " " );
  if ( TWO_WORD_TEAMS[ team.teamName ] ) {
    team.simpleName = splitted.splice( -2, 2 ).join( " " );
  } else {
    team.simpleName = splitted.splice( -1, 1 ).join();
  }
  team.location = splitted.join( " " );
  return team;
}

module.exports = function () {
  var statReq = getJSON( TEAM_STAT_URL, TEAM_STAT_QUERY );
  var infoReq = getJSON( TEAM_INFO_URL, TEAM_INFO_QUERY );
  return Promise.all([ statReq, infoReq ]).then( function ( responses ) {
    responses = responses.map( util.baseResponseTransform );
    return util.pickKeys( util.mergeCollections( "teamId", responses ),
      "teamId", "abbreviation", "teamName" )
    .map( addExtraTeamData );
  });
};
