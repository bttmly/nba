"use strict";

var request = require( "request" );
var vm = require( "vm" );

var Promise = require( "./promise" );

module.exports = function vmStrategy ( url, globalName ) {
  return new Promise ( function ( resolve, reject ) {
    request( url, function ( err, resp, body ) {
      if ( err ) {
        return reject();
      }
      var sandbox = {};
      vm.runInNewContext( body, sandbox );
      resolve( sandbox[globalName] );
    });
  });
};
