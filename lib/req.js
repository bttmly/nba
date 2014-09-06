var request = require( 'superagent' );
var Promise = require( 'es6-promise' );

module.exports = function ( url, query ) {
  return new Promise( function ( resolve, reject ) {
    request
      .get( url )
      .query( query )
      .end( function ( response ) {
        if ( response.ok ) {
          resolve( response );
        } else {
          reject( response );
        }
      });
  });
};
