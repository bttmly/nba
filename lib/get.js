var request = require( 'superagent' );
var Promise = require( 'es6-promise' ).Promise;

module.exports = function httpStrategy ( url, query ) {
  return new Promise( function ( resolve, reject ) {
    request
      .get( url )
      .query( query )
      .end( function ( response ) {
        // resolve with response.body for parity with jsonpStrategy
        if ( response.ok ) {
          resolve( response.body );
        } else {
        // reject with nothing for parity with jsonpStrategy
          reject();
        }
      });
  });
};
