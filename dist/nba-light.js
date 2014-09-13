!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.nba=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[]
},{}],2:[function(require,module,exports){
module.exports=require(1)
},{"/Users/nickbottomley/Documents/dev/github/nick/nba-api/data/players.json":1}],3:[function(require,module,exports){
var endpoints = require( "./endpoints" );
var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translateOptions = util.partial( util.translateKeys, maps.twoWayMap() );

var api = {};

Object.keys( endpoints ).forEach( function ( key ) {
  api[key] = function ( options ) {
    if ( options == null ) {
      options = {};
    }
    options = util.merge( endpoints[key].defaults(), translateOptions( options ) );
    return getJSON( endpoints[key].url, options ).then( endpoints[key].transform );
  };
});

module.exports = api;

},{"./endpoints":4,"./get-json":6,"./maps":9,"./util":14}],4:[function(require,module,exports){
var util = require( "./util" );

var DEFAULT_SEASON = "2013-14";

function boxScoreDefaults () {
  return {"GameID":"0","RangeType":"0","StartPeriod":"0","EndPeriod":"0","StartRange":"0","EndRange":"0"};
}

var endpoints = {
  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Regular Season","LeagueID":"00","PlayerID":"0","GraphStartSeason":"2009-10","GraphEndSeason":"2014-15","GraphStat":"PTS"}; },
    transform: util.generalResponseTransform
  },
  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: function () { return {"PlayerID":"0","SeasonType":"Regular Season","LeagueID":"00","asynchFlag":"true"}; },
    transform: util.generalResponseTransform
  },
  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: function () { return {"LeagueID":"00","Season":DEFAULT_SEASON,"IsOnlyCurrentSeason":"1"}; },
    transform: util.playersResponseTransform
  },
  teamStats: {
    url: "http://stats.nba.com/stats/leaguedashteamstats",
    defaults: function () { return {"Season":"2013-14","AllStarSeason":"","SeasonType":"Regular Season","LeagueID":"00","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":"","PlayerExperience":"","PlayerPosition":"","StarterBench":""}; },
    transform: util.baseResponseTransform
  },
  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Regular Season","LeagueID":"00","TeamID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":""}; },
    transform: util.generalResponseTransform
  },
  teamYears: {
    url: "http://stats.nba.com/stats/commonteamyears",
    defaults: function () { return {"LeagueID": "00"}; },
    transform: util.baseResponseTransform
  },
  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Playoffs","LeagueID":"00","PlayerID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0"}; },
    transform: util.generalResponseTransform
  },
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: function () { return {"Season":DEFAULT_SEASON,"AllStarSeason":"","SeasonType":"Regular Season","LeagueID":"00","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":"","PlayerExperience":"","PlayerPosition":"","StarterBench":""}; },
    transform: util.generalResponseTransform
  },
  scoreboard: {
    url: "http://stats.nba.com/stats/scoreboard/",
    defaults: function () { return {"LeagueID":"00","gameDate":"01/01/2000","DayOffset":"0"}; },
    transform: util.generalResponseTransform
  },
  playByPlay: {
    url: "http://stats.nba.com/stats/playbyplay",
    defaults: function () { return {"GameID":"0021300721","StartPeriod":"0","EndPeriod":"0"}; },
    transform: util.generalResponseTransform
  },
  boxScoreScoring: {
    url: "http://stats.nba.com/stats/boxscorescoring",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreUsage: {
    url: "http://stats.nba.com/stats/boxscoreusage",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreMisc: {
    url: "http://stats.nba.com/stats/boxscoremisc",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreAdvanced: {
    url: "http://stats.nba.com/stats/boxscoreadvanced",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreFourFactors: {
    url: "http://stats.nba.com/stats/boxscorefourfactors",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  }
};

module.exports = endpoints;

},{"./util":14}],5:[function(require,module,exports){
var qs = require( "query-string" );

function RequestError ( url, query ) {
  this.url = url + "?" + qs.stringify( query );
  this.message = "Request to failed: " + this.url;
}

RequestError.prototype = Object.create( Error.prototype );
RequestError.prototype.constructor = RequestError;

function ParameterError ( url, query, msg ) {
  this.url = url + "?" + qs.stringify( query );
  this.message = msg;
}

ParameterError.prototype = Object.create( Error.prototype );
ParameterError.prototype.constructor = ParameterError;

module.exports = {
  RequestError: RequestError,
  ParameterError: ParameterError
};

},{"query-string":28}],6:[function(require,module,exports){
var qs = require( "query-string" );

var Promise = require( "./promise" );
var RequestError = require( "./errors" ).RequestError;

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
      reject( new RequestError( url, query ) );
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

},{"./errors":5,"./promise":11,"query-string":28}],7:[function(require,module,exports){
var Promise = require( "./promise" );

module.exports = function scriptTagStrategy ( url, globalName ) {
  return new Promise( function ( resolve, reject ) {
    var script, prev, temp;

    function cleanup () {
      document.body.removeChild( script );
      script = null;
      window[globalName] = prev;
    }

    prev = window[globalName];
    script = document.createElement( "script" );

    Object.assign( script, {
      src: url,
      onload: function () {
        temp = window[globalName];
        cleanup();
        resolve( temp );
      },
      onerror: function () {
        cleanup();
        reject();
      }
    });

    document.body.appendChild( script );
  });
};

},{"./promise":11}],8:[function(require,module,exports){
var Promise = require( "./promise" );

var getJSON = require( "./get-json" );
var maps = require( "./maps" );
var util = require( "./util" );

var api = require( "./api" );

var TWO_WORD_TEAMS = {
  "Portland Trail Blazers": true
};

// adds location and short name data to team objects.
function addExtraTeamData ( team ) {
  team.teamName = team.teamName.trim();
  var splitted = team.teamName.split( " " );
  if ( TWO_WORD_TEAMS[ team.teamName ] ) {
    team.simpleName = splitted.splice( -2, 2 ).join( " " );
  } else {
    team.simpleName = splitted.splice( -1, 1 ).join();
  }
  team.location = splitted.join( " " );
  return team;
}

module.exports = function () {
  var statReq = api.teamStats();
  var infoReq = api.teamYears();
  return Promise.all([ statReq, infoReq ]).then( function ( responses ) {
    return util.pickKeys( util.mergeCollections( "teamId", responses ),
      "teamId", "abbreviation", "teamName" )
    .map( addExtraTeamData );
  });
};

},{"./api":3,"./get-json":6,"./maps":9,"./promise":11,"./util":14}],9:[function(require,module,exports){
var extend = require( 'extend' );

// all maps are actually map-returning functions.
// We need to absolutely prevent modules requiring these maps from altering them.
// Options:
//  - Return a "frozen" version (Object.freeze)
//  - Return a copy
//  - Return a new object
//
//  Frozen objects are sub-optimal, primarily since they don't always throw errors.
//  Also, when 'extending' them you need to pass in a new object first. Not a problem with copies.

// TODO: DRY up params
// TODO: Settle on how to pass out these objects

function nbaParams () {
  return {
    "Season": 1,
    "AllStarSeason": 1,
    "SeasonType": 1,
    "LeagueID": 1,
    "MeasureType": 1,
    "PerMode": 1,
    "PlusMinus": 1,
    "PaceAdjust": 1,
    "Rank": 1,
    "Outcome": 1,
    "Location": 1,
    "Month": 1,
    "SeasonSegment": 1,
    "DateFrom": 1,
    "DateTo": 1,
    "OpponentTeamID": 1,
    "VsConference": 1,
    "VsDivision": 1,
    "GameSegment": 1,
    "Period": 1,
    "LastNGames": 1,
    "GameScope": 1,
    "PlayerExperience": 1,
    "PlayerPosition": 1,
    "StarterBench": 1,
    "TeamID": 1,
    "GameID": 1,
    "Position": 1,
    "RookieYear": 1,
    "ContextFilter": 1,
    "ContextMeasure": 1,
    "zone-mode": 1,
    "GroupQuantity": 1,
    "pageNo": 1,
    "rowsPerPage": 1
  };
}

function jsParams () {
  return {
    "season": 1,
    "allStarSeason": 1,
    "seasonType": 1,
    "leagueId": 1,
    "measureType": 1,
    "perMode": 1,
    "plusMinus": 1,
    "paceAdjust": 1,
    "rank": 1,
    "outcome": 1,
    "location": 1,
    "month": 1,
    "seasonSegment": 1,
    "dateFrom": 1,
    "dateTo": 1,
    "opponentTeamId": 1,
    "vsConference": 1,
    "vsDivision": 1,
    "gameSegment": 1,
    "period": 1 ,
    "lastNGames": 1,
    "gameScope": 1,
    "playerExperience": 1,
    "playerPosition": 1,
    "starterBench": 1,
    "teamId": 1,
    "gameId": 1,
    "position": 1,
    "rookieYear": 1,
    "contextFilter": 1,
    "contextMeasure": 1,
    "zoneMode": 1,
    "groupQuantity": 1,
    "pageNo": 1,
    "rowsPerPage": 1
  };
}

function twoWayMap () {
  return {
    "Season": "season",
    "season": "Season",
    "AllStarSeason": "allStarSeason",
    "allStarSeason": "AllStarSeason",
    "SeasonType": "seasonType",
    "seasonType": "SeasonType",
    "LeagueID": "leagueId",
    "leagueId": "LeagueID",
    "MeasureType": "measureType",
    "measureType": "MeasureType",
    "PerMode": "perMode",
    "perMode": "PerMode",
    "PlusMinus": "plusMinus",
    "plusMinus": "PlusMinus",
    "PaceAdjust": "paceAdjust",
    "paceAdjust": "PaceAdjust",
    "Rank": "rank",
    "rank": "Rank",
    "Outcome": "outcome",
    "outcome": "Outcome",
    "Location": "location",
    "location": "Location",
    "Month": "month",
    "month": "Month",
    "SeasonSegment": "seasonSegment",
    "seasonSegment": "SeasonSegment",
    "DateFrom": "dateFrom",
    "dateFrom": "DateFrom",
    "DateTo": "dateTo",
    "dateTo": "DateTo",
    "OpponentTeamID": "opponentTeamId",
    "opponentTeamId": "OpponentTeamID",
    "VsConference": "vsConference",
    "vsConference": "VsConference",
    "VsDivision": "vsDivision",
    "vsDivision": "VsDivision",
    "GameSegment": "gameSegment",
    "gameSegment": "GameSegment",
    "Period": "period",
    "period": "Period",
    "LastNGames": "lastNGames",
    "lastNGames": "LastNGames",
    "GameScope": "gameScope",
    "gameScope": "GameScope",
    "PlayerExperience": "playerExperience",
    "playerExperience": "PlayerExperience",
    "PlayerPosition": "playerPosition",
    "playerPosition": "PlayerPosition",
    "StarterBench": "starterBench",
    "starterBench": "StarterBench",
    "TeamID": "teamId",
    "teamId": "TeamID",
    "GameID": "gameId",
    "gameId": "GameID",
    "PlayerID": "playerId",
    "playerId": "PlayerID",
    "Position": "position",
    "position": "Position",
    "RookieYear": "rookieYear",
    "rookieYear": "RookieYear",
    "ContextFilter": "contextFilter",
    "contextFilter": "ContextFilter",
    "ContextMeasure": "contextMeasure",
    "contextMeasure": "ContextMeasure",
    "zone-mode": "zoneMode",
    "zoneMode": "zone-mode",
    "GroupQuantity": "groupQuantity",
    "groupQuantity": "GroupQuantity",
    "pageNo": "pageNo",
    "rowsPerPage": "rowsPerPage",
    "StartPeriod": "startPeriod",
    "startPeriod": "StartPeriod",
    "EndPeriod": "endPeriod",
    "endPeriod": "EndPeriod",
    "DayOffset": "dayOffset",
    "dayOffset": "DayOffset"
  };
}

function shotDefaults () {
  return {
    'Season': '2013-14',
    'SeasonType': 'Regular Season',
    'LeagueID': '00',
    'PlayerID': '0',
    'TeamID': '0',
    'GameID': '',
    'Outcome': '',
    'Location': '',
    'Month': '0',
    'SeasonSegment': '',
    'DateFrom': '',
    'DateTo': '',
    'OpponentTeamID': '0',
    'VsConference': '',
    'VsDivision': '',
    'Position': '',
    'RookieYear': '',
    'GameSegment': '',
    'Period': '0',
    'LastNGames': '0',
    'ContextFilter': '',
    'ContextMeasure': 'FG_PCT',
    'zone-mode': 'basic'
  };
}

function teamStatDefaults () {
  return {
    'Season': '2013-14',
    'AllStarSeason': '',
    'SeasonType': 'Regular Season',
    'LeagueID': '00',
    'MeasureType': 'Base',
    'PerMode': 'PerGame',
    'PlusMinus': 'N',
    'PaceAdjust': 'N',
    'Rank': 'N',
    'Outcome': '',
    'Location': '',
    'Month': '0',
    'SeasonSegment': '',
    'DateFrom': '',
    'DateTo': '',
    'OpponentTeamID': '0',
    'VsConference': '',
    'VsDivision': '',
    'GameSegment': '',
    'Period': '0',
    'LastNGames': '0',
    'GameScope': '',
    'PlayerExperience': '',
    'PlayerPosition': '',
    'StarterBench': ''
  };
};

function playerSplitsDefaults () {
  return {
    "Season": "2013-14",
    "SeasonType": "Playoffs",
    "LeagueID": "00",
    "PlayerID": "201142",
    "MeasureType": "Base",
    "PerMode": "PerGame",
    "PlusMinus": "N",
    "PaceAdjust": "N",
    "Rank": "N",
    "Outcome": "",
    "Location": "",
    "Month": "0",
    "SeasonSegment": "",
    "DateFrom": "",
    "DateTo": "",
    "OpponentTeamID": "0",
    "VsConference": "",
    "VsDivision": "",
    "GameSegment": "",
    "Period": "0",
    "LastNGames": "0"
  };
}


module.exports = {
  nbaParams: nbaParams,
  jsParams: jsParams,
  twoWayMap: twoWayMap,
  shotDefaults: shotDefaults,
  teamStatDefaults: teamStatDefaults
};

// alternate method w/o freeze & such
// assuming a "maps" object with all the maps in it...
// var maps = {};
// module.exports = Object.keys( maps ).reduce( function ( result, key ) {
//   result[key] = function () {
//     return extend( {}, maps[key] );
//   };
//   return result;
// }, {} );

},{"extend":26}],10:[function(require,module,exports){
Object.assign = Object.assign || require( "object-assign" );

String.prototype.contains = String.prototype.contains || function () {
  return String.prototype.indexOf.apply( this, arguments ) !== -1;
};

},{"object-assign":27}],11:[function(require,module,exports){
module.exports = require( 'es6-promise' ).Promise;
},{"es6-promise":16}],12:[function(require,module,exports){
var SHOT_URL = "http://stats.nba.com/stats/shotchartdetail";

var extend = require( "extend" );

var Promise = require( "./promise" );

var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translateOptions = util.partial( util.translateKeys, maps.twoWayMap() );

module.exports = function ( options ) {
  if ( options == null ) {
    options = {};
  }
  options = translateOptions( options );
  return getJSON( SHOT_URL, extend( maps.shotDefaults(), options ) )
    .then( util.baseResponseTransform );
};

},{"./get-json":6,"./maps":9,"./promise":11,"./util":14,"extend":26}],13:[function(require,module,exports){
var Promise = require( "./promise" );
var getScript = require( "./get-script" );

var sportVuScripts = {
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

var getSportVu = (function () {
  var cache = {};
  return function ( key, force ) {
    var item, prms;
    if ( cache[key] === undefined || force ) {
      item = sportVuScripts[key];
      cache[key] = getScript( item.url, item.varName );
    }
    return cache[key];
  };
})();

module.exports = Object.keys( sportVuScripts ).reduce(function ( obj, key ) {
  obj[key] = function () {
    return getSportVu( key );
  };
  return obj;
}, {} );

},{"./get-script":7,"./promise":11}],14:[function(require,module,exports){
function toString ( obj ) {
  return Object.prototype.toString.call( obj );
}

function merge ( target ) {
  var source;
  var keys;
  for ( var i = 1; i < arguments.length; i++ ) {
    source = arguments[i];
    keys = Object.keys( source );
    for ( var j = 0; j < keys.length; j++ ) {
      target[keys[j]] = source[keys[j]];
    }
  }
  return target;
}

function shallowCopy ( obj ) {
  return merge( {}, obj );
}

function mapKeysAndValues ( obj, cb ) {
  return Object.keys( obj ).reduce( function( result, key ) {
    var pair = cb( obj[key], key );
    result[ pair[0] ] = pair[1];
    return result;
  }, {} );
}

function mapValues ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ key, cb( value, key ) ];
  });
}

function mapKeys ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ cb( value, key ), value ];
  });
}

// convert an array of headers and an array of rows
// into an array of objects
function collectify ( headers, rows ) {
  return rows.map( function ( item ) {
    return item.reduce( function ( model, val, i ) {
      model[ headers[i] ] = val;
      return model;
    }, {} );
  });
}

function translateKeys ( keyMap, obj ) {
  if ( typeof obj !== "object" ) {
    console.log( obj );
    throw new Error("needs an object");
  }
  return Object.keys( obj ).reduce( function ( result, key ) {
    var newKey = keyMap[key];
    if ( newKey === undefined ) {
      throw new Error( "Key not found in translator." );
    }
    result[newKey] = obj[ key ];
    return result;
  }, {} );
}

// partial application, cribbed from fast.js
function partial ( fn ) {
  var outerArgs = [];
  for ( var i = 1; i < arguments.length; i++ ) {
    outerArgs[i - 1] = arguments[i];
  }
  return function () {
    var args = outerArgs.slice();
    for ( var i = 0; i < arguments.length; i++ ) {
      args[ args.length ] = arguments[i];
    }
    return fn.apply( this, args );
  };
}

// detects whether a string contains a hyphen or dash
// (very rough way of detecting dashed or snake_case strings)
function hasDashOrHyphen ( str ) {
  return str.contains( "-" ) || str.contains( "_" );
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst ( str ) {
  return str[0].toLowerCase() + str.slice( 1 );
}

// converts a dash or hypen separated string to camelCase
function unDashHyphen ( str ) {
  return str.trim().toLowerCase().replace( /[-_\s]+(.)?/g, function ( match, c ){
    return c ? c.toUpperCase() : "";
  });
}

// picks which method to use and returns the converted string
function jsify ( str ) {
  if ( hasDashOrHyphen( str ) ) {
    return unDashHyphen( str );
  }
  return downcaseFirst( str );
}

function jsifyHeaders ( arr ) {
  return arr.map( jsify );
}

function baseResponseTransform ( resp ) {
  var data = resp.resultSets[0];
  var headers = jsifyHeaders( data.headers );
  return collectify( headers, data.rowSet );
}

function generalResponseTransform ( resp ) {
  return resp.resultSets.reduce( function ( ret, resultSet ) {
    var name = downcaseFirst( resultSet.name );
    ret[name] = collectify( jsifyHeaders( resultSet.headers ), resultSet.rowSet );
    return ret;
  }, {} );
}

function playersResponseTransform ( resp ) {
  return baseResponseTransform( resp )
      .map( function ( player ) {
        var result = shallowCopy( player );
        var names = result.displayLastCommaFirst.split( ", " ).reverse();
        result.firstName = names[0].trim();
        result.lastName = ( names[1] ? names[1] : "" ).trim();
        result.fullName = result.firstName + ( result.lastName ? " " + result.lastName : "" );
        result.playerId = result.personId;
        return result;
    });
}

// check if *against* has same values for each key in *matcher*
function matches ( matcher, against ) {
  var keys = Object.keys( matcher );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( matcher[keys[i]] !== against[keys[i]] ) {
      return false;
    }
  }
  return true;
}

// check if *against* has same value for any key in *matcher*
function matchesAny ( matcher, against ) {
  var keys = Object.keys( matcher );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( matcher[keys[i]] === against[keys[i]] ) {
      return true;
    }
  }
  return false;
}

// returns first item in *arr* for which test(item) is truthy
function find ( test, arr ) {
  for ( var i = 0; i < arr.length; i++ ) {
    if ( test( arr[i] ) ) {
      return arr[i];
    }
  }
  return null;
}

// find with matches
function findWhere ( matcher, arr ) {
  return find( partial( matches, matcher ), arr );
}

// find with matchesAny
function findWhereAny ( matcher, arr ) {
  return find( partial( matchesAny, matcher ), arr );
}

// merges collections (arrays of objects) based on a shared unique identifier
// current (mediocre) implementation
function mergeCollections ( idProp, collections ) {
  var first = collections.shift();
  return first.map( function ( itemA ) {
    var matcher = {};
    matcher[idProp] = itemA[idProp];
    var findMatch = partial( findWhere, matcher );
    var items = [{}, itemA].concat( collections.map( findMatch ) );
    return merge.apply( null, items );
  });
}

function pickKeys ( arr ) {
  var args = [];
  for ( var i = 1; i < arguments.length; i++ ) {
    args[i - 1] = arguments[i];
  }
  return arr.map( function ( item ) {
    return args.reduce( function ( obj, key ) {
      obj[key] = item[key];
      return obj;
    }, {} );
  });
}

function usDateFormat ( param ) {
  var date;
  function padValue ( num ) {
    num = String( num );
    return ( num.length === 1 ? "0" : "" ) + num;
  }
  date = new Date( param );
  if ( isNaN( date ) ) {
    throw new Error( "Invalid Date" );
  }
  return [ padValue( date.getMonth() + 1 ), padValue( date.getDate() ), date.getFullYear() ].join( "/" );
}

module.exports = {
  shallowCopy: shallowCopy,
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  merge: merge,
  find: find,
  findWhere: findWhere,
  findWhereAny: findWhereAny,
  pickKeys: pickKeys,
  collectify: collectify,
  translateKeys: translateKeys,
  partial: partial,
  jsifyHeaders: jsifyHeaders,
  mergeCollections: mergeCollections,
  baseResponseTransform: baseResponseTransform,
  generalResponseTransform: generalResponseTransform,
  playersResponseTransform: playersResponseTransform
};

},{}],15:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],16:[function(require,module,exports){
"use strict";
var Promise = require("./promise/promise").Promise;
var polyfill = require("./promise/polyfill").polyfill;
exports.Promise = Promise;
exports.polyfill = polyfill;
},{"./promise/polyfill":20,"./promise/promise":21}],17:[function(require,module,exports){
"use strict";
/* global toString */

var isArray = require("./utils").isArray;
var isFunction = require("./utils").isFunction;

/**
  Returns a promise that is fulfilled when all the given promises have been
  fulfilled, or rejected if any of them become rejected. The return promise
  is fulfilled with an array that gives all the values in the order they were
  passed in the `promises` array argument.

  Example:

  ```javascript
  var promise1 = RSVP.resolve(1);
  var promise2 = RSVP.resolve(2);
  var promise3 = RSVP.resolve(3);
  var promises = [ promise1, promise2, promise3 ];

  RSVP.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `RSVP.all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  var promise1 = RSVP.resolve(1);
  var promise2 = RSVP.reject(new Error("2"));
  var promise3 = RSVP.reject(new Error("3"));
  var promises = [ promise1, promise2, promise3 ];

  RSVP.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @for RSVP
  @param {Array} promises
  @param {String} label
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
*/
function all(promises) {
  /*jshint validthis:true */
  var Promise = this;

  if (!isArray(promises)) {
    throw new TypeError('You must pass an array to all.');
  }

  return new Promise(function(resolve, reject) {
    var results = [], remaining = promises.length,
    promise;

    if (remaining === 0) {
      resolve([]);
    }

    function resolver(index) {
      return function(value) {
        resolveAll(index, value);
      };
    }

    function resolveAll(index, value) {
      results[index] = value;
      if (--remaining === 0) {
        resolve(results);
      }
    }

    for (var i = 0; i < promises.length; i++) {
      promise = promises[i];

      if (promise && isFunction(promise.then)) {
        promise.then(resolver(i), reject);
      } else {
        resolveAll(i, promise);
      }
    }
  });
}

exports.all = all;
},{"./utils":25}],18:[function(require,module,exports){
(function (process,global){
"use strict";
var browserGlobal = (typeof window !== 'undefined') ? window : {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var local = (typeof global !== 'undefined') ? global : (this === undefined? window:this);

// node
function useNextTick() {
  return function() {
    process.nextTick(flush);
  };
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function() {
    node.data = (iterations = ++iterations % 2);
  };
}

function useSetTimeout() {
  return function() {
    local.setTimeout(flush, 1);
  };
}

var queue = [];
function flush() {
  for (var i = 0; i < queue.length; i++) {
    var tuple = queue[i];
    var callback = tuple[0], arg = tuple[1];
    callback(arg);
  }
  queue = [];
}

var scheduleFlush;

// Decide what async method to use to triggering processing of queued callbacks:
if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else {
  scheduleFlush = useSetTimeout();
}

function asap(callback, arg) {
  var length = queue.push([callback, arg]);
  if (length === 1) {
    // If length is 1, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    scheduleFlush();
  }
}

exports.asap = asap;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":15}],19:[function(require,module,exports){
"use strict";
var config = {
  instrument: false
};

function configure(name, value) {
  if (arguments.length === 2) {
    config[name] = value;
  } else {
    return config[name];
  }
}

exports.config = config;
exports.configure = configure;
},{}],20:[function(require,module,exports){
(function (global){
"use strict";
/*global self*/
var RSVPPromise = require("./promise").Promise;
var isFunction = require("./utils").isFunction;

function polyfill() {
  var local;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof window !== 'undefined' && window.document) {
    local = window;
  } else {
    local = self;
  }

  var es6PromiseSupport = 
    "Promise" in local &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
    "resolve" in local.Promise &&
    "reject" in local.Promise &&
    "all" in local.Promise &&
    "race" in local.Promise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
    (function() {
      var resolve;
      new local.Promise(function(r) { resolve = r; });
      return isFunction(resolve);
    }());

  if (!es6PromiseSupport) {
    local.Promise = RSVPPromise;
  }
}

exports.polyfill = polyfill;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./promise":21,"./utils":25}],21:[function(require,module,exports){
"use strict";
var config = require("./config").config;
var configure = require("./config").configure;
var objectOrFunction = require("./utils").objectOrFunction;
var isFunction = require("./utils").isFunction;
var now = require("./utils").now;
var all = require("./all").all;
var race = require("./race").race;
var staticResolve = require("./resolve").resolve;
var staticReject = require("./reject").reject;
var asap = require("./asap").asap;

var counter = 0;

config.async = asap; // default async is asap;

function Promise(resolver) {
  if (!isFunction(resolver)) {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  if (!(this instanceof Promise)) {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  this._subscribers = [];

  invokeResolver(resolver, this);
}

function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value, error, succeeded, failed;

  if (hasCallback) {
    try {
      value = callback(detail);
      succeeded = true;
    } catch(e) {
      failed = true;
      error = e;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (handleThenable(promise, value)) {
    return;
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    resolve(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

var PENDING   = void 0;
var SEALED    = 0;
var FULFILLED = 1;
var REJECTED  = 2;

function subscribe(parent, child, onFulfillment, onRejection) {
  var subscribers = parent._subscribers;
  var length = subscribers.length;

  subscribers[length] = child;
  subscribers[length + FULFILLED] = onFulfillment;
  subscribers[length + REJECTED]  = onRejection;
}

function publish(promise, settled) {
  var child, callback, subscribers = promise._subscribers, detail = promise._detail;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    invokeCallback(settled, child, callback, detail);
  }

  promise._subscribers = null;
}

Promise.prototype = {
  constructor: Promise,

  _state: undefined,
  _detail: undefined,
  _subscribers: undefined,

  then: function(onFulfillment, onRejection) {
    var promise = this;

    var thenPromise = new this.constructor(function() {});

    if (this._state) {
      var callbacks = arguments;
      config.async(function invokePromiseCallback() {
        invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
      });
    } else {
      subscribe(this, thenPromise, onFulfillment, onRejection);
    }

    return thenPromise;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = all;
Promise.race = race;
Promise.resolve = staticResolve;
Promise.reject = staticReject;

function handleThenable(promise, value) {
  var then = null,
  resolved;

  try {
    if (promise === value) {
      throw new TypeError("A promises callback cannot return that same promise.");
    }

    if (objectOrFunction(value)) {
      then = value.then;

      if (isFunction(then)) {
        then.call(value, function(val) {
          if (resolved) { return true; }
          resolved = true;

          if (value !== val) {
            resolve(promise, val);
          } else {
            fulfill(promise, val);
          }
        }, function(val) {
          if (resolved) { return true; }
          resolved = true;

          reject(promise, val);
        });

        return true;
      }
    }
  } catch (error) {
    if (resolved) { return true; }
    reject(promise, error);
    return true;
  }

  return false;
}

function resolve(promise, value) {
  if (promise === value) {
    fulfill(promise, value);
  } else if (!handleThenable(promise, value)) {
    fulfill(promise, value);
  }
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) { return; }
  promise._state = SEALED;
  promise._detail = value;

  config.async(publishFulfillment, promise);
}

function reject(promise, reason) {
  if (promise._state !== PENDING) { return; }
  promise._state = SEALED;
  promise._detail = reason;

  config.async(publishRejection, promise);
}

function publishFulfillment(promise) {
  publish(promise, promise._state = FULFILLED);
}

function publishRejection(promise) {
  publish(promise, promise._state = REJECTED);
}

exports.Promise = Promise;
},{"./all":17,"./asap":18,"./config":19,"./race":22,"./reject":23,"./resolve":24,"./utils":25}],22:[function(require,module,exports){
"use strict";
/* global toString */
var isArray = require("./utils").isArray;

/**
  `RSVP.race` allows you to watch a series of promises and act as soon as the
  first promise given to the `promises` argument fulfills or rejects.

  Example:

  ```javascript
  var promise1 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise 1");
    }, 200);
  });

  var promise2 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise 2");
    }, 100);
  });

  RSVP.race([promise1, promise2]).then(function(result){
    // result === "promise 2" because it was resolved before promise1
    // was resolved.
  });
  ```

  `RSVP.race` is deterministic in that only the state of the first completed
  promise matters. For example, even if other promises given to the `promises`
  array argument are resolved, but the first completed promise has become
  rejected before the other promises became fulfilled, the returned promise
  will become rejected:

  ```javascript
  var promise1 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise 1");
    }, 200);
  });

  var promise2 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error("promise 2"));
    }, 100);
  });

  RSVP.race([promise1, promise2]).then(function(result){
    // Code here never runs because there are rejected promises!
  }, function(reason){
    // reason.message === "promise2" because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  @method race
  @for RSVP
  @param {Array} promises array of promises to observe
  @param {String} label optional string for describing the promise returned.
  Useful for tooling.
  @return {Promise} a promise that becomes fulfilled with the value the first
  completed promises is resolved with if the first completed promise was
  fulfilled, or rejected with the reason that the first completed promise
  was rejected with.
*/
function race(promises) {
  /*jshint validthis:true */
  var Promise = this;

  if (!isArray(promises)) {
    throw new TypeError('You must pass an array to race.');
  }
  return new Promise(function(resolve, reject) {
    var results = [], promise;

    for (var i = 0; i < promises.length; i++) {
      promise = promises[i];

      if (promise && typeof promise.then === 'function') {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    }
  });
}

exports.race = race;
},{"./utils":25}],23:[function(require,module,exports){
"use strict";
/**
  `RSVP.reject` returns a promise that will become rejected with the passed
  `reason`. `RSVP.reject` is essentially shorthand for the following:

  ```javascript
  var promise = new RSVP.Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  var promise = RSVP.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @for RSVP
  @param {Any} reason value that the returned promise will be rejected with.
  @param {String} label optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become rejected with the given
  `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Promise = this;

  return new Promise(function (resolve, reject) {
    reject(reason);
  });
}

exports.reject = reject;
},{}],24:[function(require,module,exports){
"use strict";
function resolve(value) {
  /*jshint validthis:true */
  if (value && typeof value === 'object' && value.constructor === this) {
    return value;
  }

  var Promise = this;

  return new Promise(function(resolve) {
    resolve(value);
  });
}

exports.resolve = resolve;
},{}],25:[function(require,module,exports){
"use strict";
function objectOrFunction(x) {
  return isFunction(x) || (typeof x === "object" && x !== null);
}

function isFunction(x) {
  return typeof x === "function";
}

function isArray(x) {
  return Object.prototype.toString.call(x) === "[object Array]";
}

// Date.now is not available in browsers < IE9
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
var now = Date.now || function() { return new Date().getTime(); };


exports.objectOrFunction = objectOrFunction;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.now = now;
},{}],26:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var undefined;

var isPlainObject = function isPlainObject(obj) {
	"use strict";
	if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval) {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	"use strict";
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if (typeof target !== "object" && typeof target !== "function" || target == undefined) {
			target = {};
	}

	for (; i < length; ++i) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],27:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var pendingException;
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			try {
				to[keys[i]] = from[keys[i]];
			} catch (err) {
				if (pendingException === undefined) {
					pendingException = err;
				}
			}
		}
	}

	if (pendingException) {
		throw pendingException;
	}

	return to;
};

},{}],28:[function(require,module,exports){
/*!
	query-string
	Parse and stringify URL query strings
	https://github.com/sindresorhus/query-string
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';
	var queryString = {};

	queryString.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#)/, '');

		if (!str) {
			return {};
		}

		return str.trim().split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			var key = parts[0];
			var val = parts[1];

			key = decodeURIComponent(key);
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	queryString.stringify = function (obj) {
		return obj ? Object.keys(obj).map(function (key) {
			var val = obj[key];

			if (Array.isArray(val)) {
				return val.map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).join('&') : '';
	};

	if (typeof define === 'function' && define.amd) {
		define(function() { return queryString; });
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = queryString;
	} else {
		window.queryString = queryString;
	}
})();

},{}],29:[function(require,module,exports){
require( "./polyfills" );

var Promise = require( "./promise" );
var getTeamsInfo = require( "./info-teams" );
var util = require( "./util" );
var api = require( "./api" );

var playersPromise, teamsPromise, readyPromise;
var nba = {};

function updatePlayerInfo () {
  return api.playersInfo().then( function ( resp ) {
    nba.teamsInfo = resp;
  });
}

function updateTeamInfo () {
  return getTeamsInfo().then( function ( resp ) {
    nba.playersInfo = resp;
  });
}

util.merge( nba, {
  sportVu: require( "./sport-vu" ),
  shots: require( "./shots" ),
  playersInfo: require( "../data/players.json" ),
  updatePlayersInfo: updatePlayerInfo,
  teamsInfo: require( "../data/teams.json" ),
  updateTeamsInfo: updateTeamInfo,
  api: api,
  ready: function ( callback ) {
    readyPromise.then( callback );
  },
  playerIdFromName: function ( name ) {
    var player = util.findWhere({ fullName: name }, this.playersInfo );
    return player ? player.playerId : null;
  },
  teamIdFromName: function ( name ) {
    var team = util.findWhereAny({
      abbreviation: name,
      teamName: name,
      simpleName: name
    }, this.teamsInfo );
    return team ? team.teamId : null;
  }
});

// To provide consistent .ready() API for both light & regular versions.
playersPromise = nba.playersInfo.length ?
  Promise.resolve() :
  updatePlayerInfo();

teamsPromise = nba.teamsInfo.length ?
  Promise.resolve() :
  updateTeamInfo();

readyPromise = Promise.all([ playersPromise, teamsPromise ]);

module.exports = nba;

},{"../data/players.json":1,"../data/teams.json":2,"./api":3,"./info-teams":8,"./polyfills":10,"./promise":11,"./shots":12,"./sport-vu":13,"./util":14}]},{},[29])(29)
});