var Promise = require( "es6-promise" ).Promise;
var EventEmitter = require( "events" ).EventEmitter;
var extend = require( "extend" );

var getTeams = require( "./get-teams" );
var getPlayers = require( "./get-players" );

var promise = Promise.all([ getTeams(), getPlayers() ]);

module.exports = extend( {}, EventEmitter.prototype, {
  ready: function ( callback ) {
    promise
      .then( function () {
        callback();
      })
      .catch( function () {
        throw new Error( "Failed to fetch team or player info" );
      });
  },
  shots: require( "./shots" ),
  teamInfo: require( "./team-info" ),
  playerInfo: require( "./player-info" )
});
