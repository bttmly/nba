var defer = require( "./defer" );

var sportVu = {
  speed: {
    url: "http://stats.nba.com/js/data/sportvu/speedData.js",
    varName: "speedData",
    hasLoaded: false
  },
  touches: {
    url: "http://stats.nba.com/js/data/sportvu/touchesData.js",
    varName: "touchesData",
    hasLoaded: false
  },
  passing: {
    url: "http://stats.nba.com/js/data/sportvu/passingData.js",
    varName: "passingData",
    hasLoaded: false
  },
  defense: {
    url: "http://stats.nba.com/js/data/sportvu/defenseData.js",
    varName: "defenseData",
    hasLoaded: false
  },
  rebounding: {
    url: "http://stats.nba.com/js/data/sportvu/reboundingData.js",
    varName: "reboundingData",
    hasLoaded: false
  },
  drives: {
    url: "http://stats.nba.com/js/data/sportvu/drivesData.js",
    varName: "drivesData",
    hasLoaded: false
  },
  shooting: {
    url: "http://stats.nba.com/js/data/sportvu/shootingData.js",
    varName: "shootingData",
    hasLoaded: false
  },
  catchShoot: {
    url: "http://stats.nba.com/js/data/sportvu/catchShootData.js",
    varName: "catchShootData",
    hasLoaded: false
  },
  pullUpShoot: {
    url: "http://stats.nba.com/js/data/sportvu/pullUpShootData.js",
    varName: "pullUpShootData",
    hasLoaded: false
  }
};

var cache = {};

function getSportVu ( key ) {
  var script, item, prev;
  var deferred = defer();

  if ( cache[key] ) {
    deferred.resolve( cache[key] );
  } else {

    item = sportVu[key];
    prev = window[item.varName];
    script = document.body.createElement( "script" );

    script.src = item.url;

    script.onload = function () {
      cache[key] = window[item.varName];
      window[item.varName] = prev;
      deferred.resolve( cache[key] );
    };

    script.onerror = function () {
      window[item.varName] = prev;
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
