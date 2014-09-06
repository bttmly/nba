var defer = require( "./defer" );

var JSONP_NAMESPACE = "__jsonp__";

module.exports = function jsonp ( url ) {
  var deferred, fnName, script, src;

  function errorHandler ( evt ) {
    cleanup();
    deferred.reject();
  }

  function cleanup () {
    script.removeEventListener( "error", errorHandler );
    delete window[fnName];
    document.body.removeChild( script );
  }

  deferred = defer();
  fnName = JSONP_NAMESPACE + Math.random().toString( 36 ).slice( 2 );
  script = document.createElement( 'script' );
  script.addEventListener( "error", errorHandler );

  window[fnName] = function ( data ) {
    cleanup();
    deferred.resolve( data );
  };

  src = url;
  src += url.indexOf( "?" ) === -1 ? "?" : "&";
  src += ( "callback=" + fnName );
  script.src = src;

  document.body.appendChild( script );

  return deferred.promise;
};
