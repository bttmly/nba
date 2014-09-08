var qs = require( "query-string" );
var Promise = require( "es6-promise" ).Promise;

var PREFIX = "__jsonp__";

module.exports = function jsonpStrategy ( url, query ) {
  return new Promise( function ( resolve, reject ) {
    var fnName, script, src;

    function cleanup () {
      document.body.removeChild( script );
      script = null;
      delete window[fnName];
    }

    if ( query == null ) {
      query = {};
    }

    fnName = PREFIX + Math.random().toString( 36 ).slice( 2 );
    script = document.createElement( "script" );

    script.onerror = function () {
      cleanup();
      reject();
    };

    window[fnName] = function ( data ) {
      cleanup();
      resolve( data );
    };

    query.callback = fnName;
    script.src = url + "?" + qs.stringify( query );
    document.body.appendChild( script );
  });
};
