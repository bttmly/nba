var extend = require( "extend" );

var teamsInfo = require( "./info-teams" );
var playersInfo = require( "./info-players" );

var nba = {};

function updatePlayerInfo () {
  return teamsInfo().then( function ( resp ) {
    nba.teamInfo = resp;
  });
}

function updateTeamInfo () {
  return playersInfo().then( function ( resp ) {
    nba.playerInfo = resp;
  });
}

module.exports = {
  shots: require( "./shots" ),
  playerInfo: require( "../data/players.json" ),
  updatePlayerInfo: updatePlayerInfo,
  teamInfo: require( "../data/teams.json" ),
  updateTeamInfo: updateTeamInfo
};

