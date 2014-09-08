require( "./polyfills" );

var Promise = require( "./promise" );
var getTeamsInfo = require( "./info-teams" );
var getPlayersInfo = require( "./info-players" );
var util = require( "./util" );

var playersPromise, teamsPromise, readyPromise;
var nba = {};

function immediatelyResolvedPromise ( value ) {
  return new Promise( function ( resolve ) {
    resolve( value );
  });
}

function updatePlayerInfo () {
  return getTeamsInfo().then( function ( resp ) {
    nba.teamInfo = resp;
  });
}

function updateTeamInfo () {
  return getPlayersInfo().then( function ( resp ) {
    nba.playerInfo = resp;
  });
}

Object.assign( nba, {
  sportVu: require( "./sport-vu" ),
  shots: require( "./shots" ),
  playersInfo: require( "../data/players.json" ),
  updatePlayersInfo: updatePlayerInfo,
  teamsInfo: require( "../data/teams.json" ),
  updateTeamsInfo: updateTeamInfo,
  ready: function ( callback ) {
    readyPromise.then( callback );
  },
  playerIdFromName: function ( name ) {
    var player = util.findWhere({ fullName: name }, this.playersInfo );
    return player ? player.playerId : null;
  }
});

// To provide consistent .ready() API for both light & regular versions.
playersPromise = nba.playersInfo.length ?
  immediatelyResolvedPromise() :
  updatePlayerInfo();

teamsPromise = nba.teamsInfo.length ?
  immediatelyResolvedPromise() :
  updateTeamInfo();

readyPromise = Promise.all([ playersPromise, teamsPromise ]);

module.exports = nba;
