"use strict";

var Promise = require( "./promise" );
var getScript = require( "./get-script" );

var sportVuScripts = {
  speed: {
    url: "http://stats.nba.com/js/data/sportvu/speedData.js",
    varName: "speedData"
  },
  touches: {
    url: "http://stats.nba.com/js/data/sportvu/touchesData.js",
    varName: "touchesData"
  },
  passing: {
    url: "http://stats.nba.com/js/data/sportvu/passingData.js",
    varName: "passingData"
  },
  defense: {
    url: "http://stats.nba.com/js/data/sportvu/defenseData.js",
    varName: "defenseData"
  },
  rebounding: {
    url: "http://stats.nba.com/js/data/sportvu/reboundingData.js",
    varName: "reboundingData"
  },
  drives: {
    url: "http://stats.nba.com/js/data/sportvu/drivesData.js",
    varName: "drivesData"
  },
  shooting: {
    url: "http://stats.nba.com/js/data/sportvu/shootingData.js",
    varName: "shootingData"
  },
  catchShoot: {
    url: "http://stats.nba.com/js/data/sportvu/catchShootData.js",
    varName: "catchShootData"
  },
  pullUpShoot: {
    url: "http://stats.nba.com/js/data/sportvu/pullUpShootData.js",
    varName: "pullUpShootData"
  }
};

var getSportVu = (function () {
  var cache = {};
  return function ( key, force ) {
    return new Promise( function ( resolve, reject ) {
      var item;
      if ( cache[key] == null || force ) {
        item = sportVuScripts[key];
        getScript( item.url, item.varName )
          .then( resolve )
          .catch( reject );
      } else {
        resolve( cache[key] );
      }

    });
  };
})();

module.exports = Object.keys( sportVuScripts ).reduce(function ( obj, key ) {
  obj[key] = function () {
    return getSportVu( key );
  };
  return obj;
}, {} );
