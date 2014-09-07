var Promise = require( "es6-promise" ).Promise;

function scriptTagStrategy ( url, globalName ) {
  return new Promise( function ( resolve, reject ) {
    var script, prev, temp;

    function cleanup () {
      document.body.removeChild( script );
      script = null;
      window[globalName] = prev;
    }

    prev = window[globalName];
    script = document.body.createElement( "script" );

    script.src = url;

    script.onload = function () {
      temp = window[globalName];
      cleanup();
      resolve( temp );
    };

    script.onerror = function () {
      cleanup();
      reject();
    };

    document.body.appendChild( script );
  });
}
