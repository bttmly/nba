var Promise = window.Promise;

module.exports = function( url, callback ) {

  var promise = new Promise( function ( resolve, reject ) {

    var fnName = "jsonp_" + Math.random().toString( 36 ).slice( 2 );
    var script = document.createElement( 'script' );

    function cleanup () {
      document.body.removeChild( script );
      script = null;
      delete window[fnName];
    }

    function errorListener ( evt ) {
      evt.target.removeEventListener( 'error', errorListener );
      if ( callback ) {
        callback( evt );
      } else {
        reject( evt );
      }
      cleanup();
    }

    window[fnName] = function ( data ) {
      if ( callback ) {
        callback( null, data );
      } else {
        resolve( data );
      }
      cleanup();
    };

    script.src = url + "?callback=" + fnName;
    script.addEventListener( 'error', errorListener );
    document.body.appendChild( script );

  });

  return callback == null ? promise : null;

};
