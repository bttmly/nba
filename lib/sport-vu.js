"use strict";

var Promise = require( "./promise" );
var getScript = require( "./get-script" );

var urlRoot = "http://stats.nba.com/js/data/sportvu/";

var sportVuScripts = {
  speed: {
    url: urlRoot + "speedData.js",
    varName: "speedData"
  },
  touches: {
    url: urlRoot + "touchesData.js",
    varName: "touchesData"
  },
  passing: {
    url: urlRoot + "passingData.js",
    varName: "passingData"
  },
  defense: {
    url: urlRoot + "defenseData.js",
    varName: "defenseData"
  },
  rebounding: {
    url: urlRoot + "reboundingData.js",
    varName: "reboundingData"
  },
  drives: {
    url: urlRoot + "drivesData.js",
    varName: "drivesData"
  },
  shooting: {
    url: urlRoot + "shootingData.js",
    varName: "shootingData"
  },
  catchShoot: {
    url: urlRoot + "catchShootData.js",
    varName: "catchShootData"
  },
  pullUpShoot: {
    url: urlRoot + "pullUpShootData.js",
    varName: "pullUpShootData"
  }
};

var cache = {};

var getSportVu = function ( key, force ) {
  return new Promise( function ( resolve, reject ) {
    var item;
    if ( cache[key] == null || force ) {
      item = sportVuScripts[key];
      return getScript( item.url, item.varName )
        .then( resolve )
        .catch( reject );
    }
    resolve( cache[key] );
  });
};

module.exports = Object.keys( sportVuScripts ).reduce(function ( obj, key ) {
  obj[key] = function () {
    return getSportVu( key );
  };
  return obj;
}, {} );
