var request = require( 'superagent' );
var Promise = require( 'es6-promise' ).Promise;

module.exports = function get ( url, query ) {
  return new Promise( function ( resolve, reject ) {
    request
      .get( url )
      .query( query )
      .end( function ( response ) {
        // TODO: ensure resolve/reject occur with same values
        // here and in jsonp
        if ( response.ok ) {
          resolve( response );
        } else {
          reject( response );
        }
      });
  });
};
