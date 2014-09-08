var extend = require( "extend" );
var Promise = require( "es6-promise" ).Promise;

var getTeamsInfo = require( "./info-teams" );
var getPlayersInfo = require( "./info-players" );

var nba;

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

nba = {
  sportVu: require( "./sport-vu" ),
  shots: require( "./shots" ),
  playersInfo: require( "../data/players.json" ),
  updatePlayersInfo: updatePlayerInfo,
  teamsInfo: require( "../data/teams.json" ),
  updateTeamsInfo: updateTeamInfo
};

// in order to provide same .ready() API for heavy and light versions...
//
var playersPromise = nba.playersInfo.length ?
  immediatelyResolvedPromise() :
  updatePlayerInfo();

var teamsPromise = nba.teamsInfo.length ?
  immediatelyResolvedPromise() :
  updateTeamInfo();

var readyPromise = Promise.all([ playersPromise, teamsPromise ]);

nba.ready = function ( callback ) {
  readyPromise.then( callback );
};

module.exports = nba;
