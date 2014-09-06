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
  if ( cache[key] ) {
    return cache[key];
  }
}

module.exports = {};

Object.keys( sportVu ).forEach( function ( key ) {
  module.exports[key] = function () {
    return getSportVu( key );
  };
  cache[key] = null;
});
