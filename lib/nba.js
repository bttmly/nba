var Promise = require( "es6-promise" ).Promise;
var EventEmitter = require( "events" ).EventEmitter;

var getTeams = require( "./get-teams" );
var getPlayers = require( "./get-players" );

var nba = Object.create( EventEmitter.prototype );

Promise.all([ getTeams(), getPlayers() ])
  .then( function () {
    var players = arguments[0][0];
    var teams = arguments[0][1];
    nba.emit( "ready" );
  })
  .catch( function () {
    nba.emit( "initError" );
  });






module.exports = nba;
