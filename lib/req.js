var request = require( 'superagent' );
var Promise = require( 'es6-promise' );

var proto = Object.getPrototypeOf( request.get( '/' ) );

var prevEnd = proto.end;

proto.end = function () {
  var self = this;
  return new Promise( function ( resolve, reject ) {
    prevEnd.call( self, function ( resp ) {
      if ( resp.ok ) {
        resolve( resp );
      } else {
        reject( resp );
      }
    });
  });
};

module.exports = request;
