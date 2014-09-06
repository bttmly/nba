var qs = require( "query-string" );
var defer = require( "./defer" );
var JSONP_NAMESPACE = "__jsonp__";

module.exports = function jsonp ( url, query ) {
  var deferred, fnName, script, src;

  if ( query == null ) {
    query = {};
  }

  function errorHandler ( evt ) {
    cleanup();
    deferred.reject();
  }

  function cleanup () {
    script.removeEventListener( "error", errorHandler );
    document.body.removeChild( script );
    script = null;
    delete window[fnName];
  }

  deferred = defer();
  fnName = JSONP_NAMESPACE + Math.random().toString( 36 ).slice( 2 );
  script = document.createElement( 'script' );

  query.callback = fnName;
  script.addEventListener( "error", errorHandler );

  window[fnName] = function ( data ) {
    cleanup();
    deferred.resolve( data );
  };

  script.src = url + "?" + qs.stringify( query );
  document.body.appendChild( script );
  return deferred.promise;
};
