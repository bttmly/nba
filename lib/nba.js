var extend = require( "extend" );

var getTeams = require( "./get-teams" );
var getPlayers = require( "./get-players" );

var nba = {};

function updatePlayerInfo () {
  return getTeams().then( function ( resp ) {
    nba.teamInfo = resp;
  });
}

function updateTeamInfo () {
  return getPlayers().then( function ( resp ) {
    nba.playerInfo = resp;
  });
}

extend( nba, {
  shots: require( "./shots" ),
  playerInfo: require( "../data/players.json" ),
  updatePlayerInfo: updatePlayerInfo,
  teamInfo: require( "../data/teams.json" ),
  updateTeamInfo: updateTeamInfo
});

module.exports = nba;

