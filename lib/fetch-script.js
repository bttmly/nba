var request = require( "request" );
var vm = require( "vm" );
var Promise = require( "es6-promise" ).Promise;

function vmStrategy ( url, globalName ) {
  return new Promise ( function ( resolve, reject ) {
    request( url, function ( err, resp, body ) {
      if ( err ) {
        reject();
        return;
      }
      var sandbox = {};
      vm.runInNewContext( body, sandbox );
      resolve( sandbox[globalName] );
    });
  });
}

module.exports = vmStrategy;
