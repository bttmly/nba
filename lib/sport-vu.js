var defer = require( "./defer" );

var sportVu = {
  speed: {
    url: "http://stats.nba.com/js/data/sportvu/speedData.js",
    varName: "speedData",
  },
  touches: {
    url: "http://stats.nba.com/js/data/sportvu/touchesData.js",
    varName: "touchesData",
  },
  passing: {
    url: "http://stats.nba.com/js/data/sportvu/passingData.js",
    varName: "passingData",
  },
  defense: {
    url: "http://stats.nba.com/js/data/sportvu/defenseData.js",
    varName: "defenseData",
  },
  rebounding: {
    url: "http://stats.nba.com/js/data/sportvu/reboundingData.js",
    varName: "reboundingData",
  },
  drives: {
    url: "http://stats.nba.com/js/data/sportvu/drivesData.js",
    varName: "drivesData",
  },
  shooting: {
    url: "http://stats.nba.com/js/data/sportvu/shootingData.js",
    varName: "shootingData",
  },
  catchShoot: {
    url: "http://stats.nba.com/js/data/sportvu/catchShootData.js",
    varName: "catchShootData",
  },
  pullUpShoot: {
    url: "http://stats.nba.com/js/data/sportvu/pullUpShootData.js",
    varName: "pullUpShootData",
  }
};

var cache = {};

function getSportVu ( key ) {
  var script, item, prev;
  var deferred = defer();

  function cleanup () {
    window[item.varName] = prev;
    document.body.removeChild( script );
    script = null;
  }

  if ( cache[key] ) {
    deferred.resolve( cache[key] );

  } else {

    item = sportVu[key];
    prev = window[item.varName];
    script = document.body.createElement( "script" );

    script.src = item.url;

    script.onload = function () {
      cache[key] = window[item.varName];
      cleanup();
      deferred.resolve( cache[key] );
    };

    script.onerror = function () {
      cleanup();
      deferred.reject();
    };

    document.body.appendChild( script );

  }

  return deferred.promise;
}

module.exports = {};

Object.keys( sportVu ).reduce( function ( obj, key ) {
  obj[key] = function () {
    return getSportVu( key );
  };
}, module.exports );
