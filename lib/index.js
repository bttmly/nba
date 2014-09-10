require( "./polyfills" );

var Promise = require( "./promise" );
var getTeamsInfo = require( "./_info-teams" );
var getPlayersInfo = require( "./info-players" );
var util = require( "./util" );
var api = require( "./api" );

var playersPromise, teamsPromise, readyPromise;
var nba = {};

function updatePlayerInfo () {
  return api.playersInfo().then( function ( resp ) {
    nba.teamsInfo = resp;
  });
}

function updateTeamInfo () {
  return getPlayersInfo().then( function ( resp ) {
    nba.playersInfo = resp;
  });
}

Object.assign( nba, {
  sportVu: require( "./sport-vu" ),
  shots: require( "./shots" ),
  playersInfo: require( "../data/players.json" ),
  updatePlayersInfo: updatePlayerInfo,
  teamsInfo: require( "../data/teams.json" ),
  updateTeamsInfo: updateTeamInfo,
  api: api,
  // _maps: require( "./maps" ),
  _util: require( "./util" ),
  ready: function ( callback ) {
    readyPromise.then( callback );
  },
  playerIdFromName: function ( name ) {
    var player = util.findWhere({ fullName: name }, this.playersInfo );
    return player ? player.playerId : null;
  },
  teamIdFromName: function ( name ) {
    var team = util.findWhereAny({
      abbreviation: name,
      teamName: name,
      simpleName: name
    }, this.teamsInfo );
    return team ? team.teamId : null;
  }
});

// To provide consistent .ready() API for both light & regular versions.
playersPromise = nba.playersInfo.length ?
  Promise.resolve() :
  updatePlayerInfo();

teamsPromise = nba.teamsInfo.length ?
  Promise.resolve() :
  updateTeamInfo();

readyPromise = Promise.all([ playersPromise, teamsPromise ]);

module.exports = nba;
