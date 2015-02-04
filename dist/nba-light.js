!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.nba=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[]
},{}],2:[function(require,module,exports){
module.exports=require(1)
},{"/Users/calenewman/Desktop/nba/data/players.json":1}],3:[function(require,module,exports){
"use strict";

var qs = require("qs");

var ep = require("./endpoints");
var maps = require("./maps");
var util = require("./util");
var getJSON = require("./get-json");

var translate = util.partial(util.translateKeys, maps.twoWayMap());

// throw a .debug on main api?
var recordedUrls = [];

// TODO refactor
var flags = {
  recordUrls: false
};

var api = util.makeDict();


api._flags = flags;
api._recordedUrls = recordedUrls;

function recordUrl (url, query) {
  recordedUrls.push(url + "?" + qs.stringify(query));
}

Object.keys(ep).forEach(function (key) {
  api[key] = function (options, cb) {

    if (typeof options === "function") {
      cb = options;
      options = {};
    }

    if (typeof cb !== "function") {
      throw new TypeError("Must pass a callback.");
    }

    // this is a temporary fix; figure out a better way to handle this long term.
    try {
      options = util.merge(ep[key].defaults(), translate(options));
    } catch (err) {
      return cb(err);
    }

    if (api._flags.recordUrls) {
      recordUrl(ep[key], options);
    }

    return getJSON(ep[key].url, options, function (err, response) {
      if (err) {
        return cb(err);
      }
      cb(null, ep[key].transform(response));
    });
  };
});

module.exports = api;

},{"./endpoints":4,"./get-json":6,"./maps":9,"./util":11,"qs":13}],4:[function(require,module,exports){
"use strict";

var util = require("./util");

var DEFAULT_SEASON = "2014-15";

function boxScoreDefaults () {
  return {"GameID": "0", "RangeType": "0", "StartPeriod": "0", "EndPeriod": "0", "StartRange": "0", "EndRange": "0"};
}

var endpoints = {
  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "LeagueID": "00", "PlayerID": "0", "GraphStartSeason": "2009-10", "GraphEndSeason": "2014-15", "GraphStat": "PTS"};
    },
    transform: util.generalResponseTransform
  },
  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: function () {
      return {"PlayerID": "0", "SeasonType": "Regular Season", "LeagueID": "00", "asynchFlag": "true"};
    },
    transform: util.generalResponseTransform
  },
  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: function () {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "IsOnlyCurrentSeason": "1"};
    },
    transform: util.playersResponseTransform
  },
  teamStats: {
    url: "http://stats.nba.com/stats/leaguedashteamstats",
    defaults: function () {
      return {"Season": "2013-14", "AllStarSeason": "", "SeasonType": "Regular Season", "LeagueID": "00", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": "", "PlayerExperience": "", "PlayerPosition": "", "StarterBench": ""};
    },
    transform: util.baseResponseTransform
  },
  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "LeagueID": "00", "TeamID": "0", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": ""};
    },
    transform: util.generalResponseTransform
  },
  teamYears: {
    url: "http://stats.nba.com/stats/commonteamyears",
    defaults: function () {
      return {"LeagueID": "00"};
    },
    transform: util.baseResponseTransform
  },
  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Playoffs", "LeagueID": "00", "PlayerID": "0", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  },
  // does shots need playerId?
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: function () {
      return {"PlayerID": "0", "Season": DEFAULT_SEASON, "AllStarSeason": "", "SeasonType": "Regular Season", "LeagueID": "00", "TeamID": "", "GameID": "", "Position": "", "RookieYear": "", "ContextMeasure": "FG_PCT", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": "", "PlayerExperience": "", "PlayerPosition": "", "StarterBench": ""};
    },
    transform: util.generalResponseTransform
  },
  scoreboard: {
    url: "http://stats.nba.com/stats/scoreboard",
    defaults: function () {
      return {"LeagueID": "00", "gameDate": "01/01/2000", "DayOffset": "0"};
    },
    transform: util.generalResponseTransform
  },
  playByPlay: {
    url: "http://stats.nba.com/stats/playbyplay",
    defaults: function () {
      return {"GameID": "0", "StartPeriod": "0", "EndPeriod": "0"};
    },
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
  },
  teamHistoricalLeaders: {
    url: "http://stats.nba.com/stats/teamhistoricalleaders",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  teamInfoCommon: {
    url: "http://stats.nba.com/stats/teaminfocommon",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  commonTeamRoster: {
    url: "http://stats.nba.com/stats/commonteamroster",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  teamPlayerDashboard: {
    url: "http://stats.nba.com/stats/teamplayerdashboard",
    defaults: function() {
      return {"MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "LeagueID": "00", "Season": DEFAULT_SEASON,
              "TeamID": "0", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "",
              "GameSegment": "", "Period": "0", "LastNGames": "0" };
    },
    transform: util.generalResponseTransform
  },
  playerDashPtShotLog: {
    url: "http://stats.nba.com/stats/playerdashptshotlog",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "PlayerID": "0", "TeamID": "0", "MeasureType": "Base",
              "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "",
              "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  },
  playerDashPtReboundLogs: {
    url: "http://stats.nba.com/stats/playerdashptreboundlogs",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "PlayerID": "0", "TeamID": "0",
              "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "",
              "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  }
};

module.exports = endpoints;

},{"./util":11}],5:[function(require,module,exports){
"use strict";

var qs = require("query-string");

function RequestError (url, query) {
  this.url = url + "?" + qs.stringify(query);
  this.message = "Request failed: " + this.url;
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

function ParameterError (url, query, msg) {
  this.url = url + "?" + qs.stringify(query);
  this.message = msg;
}

ParameterError.prototype = Object.create(Error.prototype);
ParameterError.prototype.constructor = ParameterError;

module.exports = {
  RequestError: RequestError,
  ParameterError: ParameterError
};

},{"query-string":18}],6:[function(require,module,exports){
"use strict";

var qs = require("query-string");

var RequestError = require("./errors").RequestError;

var PREFIX = "__jsonp__";

module.exports = function jsonpStrategy (url, query, callback) {
  var fnName, script;

  function cleanup () {
    document.body.removeChild(script);
    script = null;
    delete window[fnName];
  }

  if (query == null) {
    query = {};
  }

  fnName = PREFIX + Math.random().toString(36).slice(2);
  script = document.createElement("script");

  script.onerror = function () {
    cleanup();
    callback(new RequestError(url, query));
  };

  window[fnName] = function (data) {
    cleanup();
    callback(null, data);
  };

  query.callback = fnName;
  script.src = url + (query ? "?" + qs.stringify(query) : "");
  document.body.appendChild(script);
};


},{"./errors":5,"query-string":18}],7:[function(require,module,exports){
"use strict";
var assign = require("object-assign");

module.exports = function scriptTagStrategy (url, globalName, callback) {
  var script, prev, temp;

  function cleanup () {
    document.body.removeChild(script);
    script = null;
    window[globalName] = prev;
  }

  prev = window[globalName];
  script = document.createElement("script");

  assign(script, {
    src: url,
    onload: function () {
      temp = window[globalName];
      cleanup();
      callback(null, temp);
    },
    onerror: function () {
      cleanup();
      callback(new Error(url));
    }
  });

  document.body.appendChild(script);
};
},{"object-assign":12}],8:[function(require,module,exports){
"use strict";

var util = require("./util");
var api = require("./api");

var TWO_WORD_TEAMS = util.makeDict({
  "Portland Trail Blazers": true
});

// adds location city and short name (i.e. 'Warriors') data to team objects.
function addExtraTeamData (team) {
  team.teamName = team.teamName.trim();
  var splitted = team.teamName.split(" ");
  if (TWO_WORD_TEAMS[team.teamName]) {
    team.simpleName = splitted.splice(-2, 2).join(" ");
  } else {
    team.simpleName = splitted.splice(-1, 1).join();
  }
  team.location = splitted.join(" ");
  return team;
}

module.exports = function (cb) {
  var results = new Array(2);

  api.teamStats(function (err, response) {
    if (err) {
      return cb(err);
    }
    results[0] = response;
    if (results[1]) {
      andThen(results);
    }
  });

  api.teamYears(function (err, response) {
    if (err) {
      return cb(err);
    }
    results[1] = response;
    if (results[0]) {
      andThen(results);
    }
  });

  function andThen (responses) {
    var data = util.pickKeys(util.mergeCollections("teamId", responses),
      "teamId", "abbreviation", "teamName")
    .map(addExtraTeamData);
    cb(null, data);
  }
};

},{"./api":3,"./util":11}],9:[function(require,module,exports){
"use strict";

// All maps are actually map-returning functions. We need to absolutely
// prevent modules requiring these maps from altering them.
//
// Options:
//  - Return a "frozen" version (Object.freeze)
//  - Return a copy
//  - Return a new object
//
//  Frozen objects are sub-optimal, primarily since they don't
//  always throw errors. Also, when "extending" them you need
//  to pass in a new object first. Not a problem with copies.

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
    "dayOffset": "DayOffset",
    "gameDate": "GameDate",
    "GameDate": "gameDate"
  };
}

module.exports = {
  nbaParams: nbaParams,
  jsParams: jsParams,
  twoWayMap: twoWayMap
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

},{}],10:[function(require,module,exports){
"use strict";

var getScript = require("./get-script");

var urlRoot = "http://stats.nba.com/js/data/sportvu/";

var sportVuScripts = [
  "speed",
  "touches",
  "passing",
  "defense",
  "rebounding",
  "drives",
  "shooting",
  "catchShoot",
  "pullUpShoot"
].reduce(function (obj, field) {
  obj[field] = {
    url: urlRoot + field + "Data.js",
    varName: field + "Data"
  };
  return obj;
}, {});

var cache = {};

var getSportVu = function (key, options, callback) {
  
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  if (typeof callback !== "function") {
    throw new TypeError("Needs a callback function.");
  }

  var item = sportVuScripts[key];
  
  if (cache[key] == null || options.noCache) {
    return getScript(item.url, item.varName, callback)
  }

  callback(null, cache[key]);
};

module.exports = Object.keys(sportVuScripts).reduce(function (obj, key) {
  obj[key] = function (options, callback) {
    return getSportVu(key, options, callback);
  };
  return obj;
}, {});

},{"./get-script":7}],11:[function(require,module,exports){
"use strict";

function merge (target) {
  var source;
  var keys;
  for (var i = 1; i < arguments.length; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    for (var j = 0; j < keys.length; j++) {
      target[keys[j]] = source[keys[j]];
    }
  }
  return target;
}

function shallowCopy (obj) {
  return merge({}, obj);
}

function mapKeysAndValues (obj, cb) {
  return Object.keys(obj).reduce(function (result, key) {
    var pair = cb(obj[key], key, obj);
    result[pair[0]] = pair[1];
    return result;
  }, {});
}

function mapValues (obj, cb) {
  return mapKeysAndValues(obj, function (value, key) {
    return [key, cb(value, key, obj)];
  });
}

function mapKeys (obj, cb) {
  return mapKeysAndValues(obj, function (value, key) {
    return [cb(value, key, obj), value];
  });
}

// convert an array of headers and an array of rows
// into an array of objects
function collectify (headers, rows) {
  return rows.map(function (item) {
    return item.reduce(function (model, val, i) {
      model[headers[i]] = val;
      return model;
    }, {});
  });
}

function translateKeys (keyMap, obj) {
  if (typeof obj !== "object") {
    throw new Error("needs an object");
  }
  return mapKeys(obj, function (value, key) {
    var newKey = keyMap[key];
    if (newKey == null) {
      throw new Error("Key not found in translator.");
    }
    return newKey;
  });
  // return Object.keys(obj).reduce(function (result, key) {
  //   var newKey = keyMap[key];
  //   if (newKey === undefined) {
  //     throw new Error("Key not found in translator.");
  //   }
  //   result[newKey] = obj[key];
  //   return result;
  // }, {});
}

// partial application, cribbed from fast.js
function partial (fn) {
  var outerArgs = [];
  for (var i = 1; i < arguments.length; i++) {
    outerArgs[i - 1] = arguments[i];
  }
  return function () {
    var args = outerArgs.slice();
    for (var i = 0; i < arguments.length; i++) {
      args[args.length] = arguments[i];
    }
    return fn.apply(this, args);
  };
}

// detects whether a string contains an underscore or dash
// (very rough way of detecting dashed or snake_case strings)
function hasUnderscoreOrHyphen (str) {
  return str.indexOf("-") > -1 || str.indexOf("_") > -1;
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst (str) {
  return str[0].toLowerCase() + str.slice(1);
}

// converts an underscore or hypen separated string to camelCase
function unDashHyphen (str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, function (match, c) {
      return c ? c.toUpperCase() : "";
    });
}

// picks which method to use and returns the converted string
function jsify (str) {
  if (hasUnderscoreOrHyphen(str)) {
    return unDashHyphen(str);
  }
  return downcaseFirst(str);
}

function jsifyHeaders (arr) {
  return arr.map(jsify);
}

function baseResponseTransform (resp) {
  var data = resp.resultSets[0];
  var headers = jsifyHeaders(data.headers);
  return collectify(headers, data.rowSet);
}

function generalResponseTransform (resp) {
  return resp.resultSets.reduce(function (ret, set) {
    var name = downcaseFirst(set.name);
    ret[name] = collectify(jsifyHeaders(set.headers), set.rowSet);
    return ret;
  }, {});
}

function playersResponseTransform (resp) {
  return baseResponseTransform(resp)
    .map(function (player) {
      var result = {};
      var names = player.displayLastCommaFirst.split(", ").reverse();
      result.firstName = names[0].trim();
      result.lastName = (names[1] ? names[1] : "").trim();
      result.playerId = player.personId;
      return result;
    });
}

function buildPlayers (players) {
  players.forEach(function (player) {
    player.fullName = player.firstName +
      (player.lastName ? " " + player.lastName : "");
    player.downcaseName = player.fullName.toLowerCase();
  });
  return players;
}

// check if *against* has same values for each key in *matcher*
function matches (matcher, against) {
  var keys = Object.keys(matcher);
  for (var i = 0; i < keys.length; i++) {
    if (matcher[keys[i]] !== against[keys[i]]) {
      return false;
    }
  }
  return true;
}

// check if *against* has same value for any key in *matcher*
function matchesAny (matcher, against) {
  var keys = Object.keys(matcher);
  for (var i = 0; i < keys.length; i++) {
    if (matcher[keys[i]] === against[keys[i]]) {
      return true;
    }
  }
  return false;
}

function contains (item, arr) {
  return arr.indexOf(item) !== -1;
}

// returns first item in *arr* for which test(item) is truthy
function find (test, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (test(arr[i])) {
      return arr[i];
    }
  }
  return null;
}

// find with matches
function findWhere (matcher, arr) {
  return find(partial(matches, matcher), arr);
}

// find with matchesAny
function findWhereAny (matcher, arr) {
  return find(partial(matchesAny, matcher), arr);
}

// merges collections (arrays of objects) based on a shared unique identifier
// current (mediocre) implementation
function mergeCollections (idProp, collections) {
  var first = collections.shift();
  return first.map(function (itemA) {
    var matcher, findMatch, items;
    matcher = {};
    matcher[idProp] = itemA[idProp];
    findMatch = partial(findWhere, matcher);
    items = [{}, itemA].concat(collections.map(findMatch));
    return merge.apply(null, items);
  });
}

function pickKeys (arr) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  return arr.map(function (item) {
    return args.reduce(function (obj, key) {
      obj[key] = item[key];
      return obj;
    }, {});
  });
}

function usDateFormat (param, joinChar) {
  if (joinChar == null) {
    joinChar = "/";
  }
  var date;
  function padValue (num) {
    num = String(num);
    return num.length === 1 ? "0" + num : num;
  }
  date = new Date(param);
  if (isNaN(date)) {
    throw new Error("Invalid Date");
  }
  return [
    padValue(date.getMonth() + 1),
    padValue(date.getDate()),
    date.getFullYear()
 ].join(joinChar);
}

function makeDict (obj) {
  var ret = Object.create(null);
  if (obj !== undefined) {
    Object.keys(obj).forEach(function (key) {
      ret[key] = obj[key];
    });
  }
  return ret;
}

function inherit (Child, Parent) {
  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      writable: true,
      enumerable: false,
      configurable: true
    }
  });
}

// if you want to have `this` binding, use .bind()
function tryCatchCall (func) {
  // should we even bother to optimize arguments?
  // this function necessarily has a try/catch block
  // in it, which itself will negate V8 optimizations
  var len = arguments.length - 1;
  var args = new Array(len);
  var i = 0;
  var result;
  while (++i < len) {
    args[i] = arguments[i];
  }
  try {
    result = func.apply(null, args);
  } catch (err) {
    return err;
  }
  return result;
}

module.exports = {
  downcaseFirst: downcaseFirst,
  hasUnderscoreOrHyphen: hasUnderscoreOrHyphen,
  unDashHyphen: unDashHyphen,
  makeDict: makeDict,
  usDateFormat: usDateFormat,
  shallowCopy: shallowCopy,
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  merge: merge,
  find: find,
  contains: contains,
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
  playersResponseTransform: playersResponseTransform,
  buildPlayers: buildPlayers
};

},{}],12:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],13:[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":14}],14:[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":15,"./stringify":16}],15:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) &&
            root !== cleanRoot &&
            indexString === cleanRoot &&
            index >= 0 &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":17}],16:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    indices: true
};


internals.stringify = function (obj, prefix, options) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (!options.indices &&
            Array.isArray(obj)) {

            values = values.concat(internals.stringify(obj[key], prefix, options));
        }
        else {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', options));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
    options.indices = typeof options.indices === 'boolean' ? options.indices : internals.indices;

    var keys = [];

    if (typeof obj !== 'object' ||
        obj === null) {

        return '';
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, options));
    }

    return keys.join(delimiter);
};

},{"./utils":17}],17:[function(require,module,exports){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        }
        else {
            target[source] = true;
        }

        return target;
    }

    if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
    }

    if (Array.isArray(target) &&
        !Array.isArray(source)) {

        target = exports.arrayToObject(target);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (!target[key]) {
            target[key] = value;
        }
        else {
            target[key] = exports.merge(target[key], value);
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, il = obj.length; i < il; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (obj === null ||
        typeof obj === 'undefined') {

        return false;
    }

    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";

var getTeamsInfo = require("./info-teams");
var util = require("./util");
var api = require("./api");

var nba = {};

function updatePlayerInfo (cb) {
  return api.playersInfo(function (err, resp) {
    nba.teamsInfo = resp;
    cb(err, resp);
  });
}

function updateTeamInfo (cb) {
  return getTeamsInfo(function (err, resp) {
    nba.playersInfo = resp;
    cb(err, resp);
  });
}

var readyCallbacks = [];
var isReady = false;
var readyArg = null;

util.merge(nba, {
  sportVu: require("./sport-vu"),
  playersInfo: util.buildPlayers(require("../data/players.json")),
  updatePlayersInfo: updatePlayerInfo,
  teamsInfo: require("../data/teams.json"),
  updateTeamsInfo: updateTeamInfo,
  api: api,
  ready: function (callback) {
    if (typeof callback !== "function") {
      throw new TypeError("ready() only accepts functions");
    }
    if (isReady) {
      return callback.call(this, readyArg);
    }
    readyCallbacks.push(callback);
  },
  playerIdFromName: function (name) {
    var player = util.findWhere({ fullName: name }, nba.playersInfo);
    return player ? player.playerId : null;
  },
  findPlayer: function (str) {
    return util.find(util.partial(util.contains, str), nba.playersInfo);
  },
  searchPlayers: function (str) {
    str = str.toLowerCase();
    return nba.playersInfo.filter(function (player) {
      return player.downcaseName.indexOf(str) !== -1;
    });
  },
  teamIdFromName: function (name) {
    var team = util.findWhereAny({
      abbreviation: name,
      teamName: name,
      simpleName: name
    }, nba.teamsInfo);
    return team ? team.teamId : null;
  }
});

function init () {

  function doReady () {
    while (readyCallbacks.length) {
      readyCallbacks.pop().call(null, readyArg);
    }
  }

  function dummy (cb) {
    cb(readyArg);
  }

  var _players = nba.playersInfo.length ? dummy : updatePlayerInfo;
  var _teams = nba.teamsInfo.length ? dummy : updateTeamInfo;

  _players(function (err) {
    if (err) {
      readyArg = err;
      isReady = true;
      return doReady();
    }
    _teams(function (err) {
      if (err) {
        readyArg = err;
      }
      isReady = true;
      doReady();
    });
  });
}

init();

module.exports = nba;

},{"../data/players.json":1,"../data/teams.json":2,"./api":3,"./info-teams":8,"./sport-vu":10,"./util":11}]},{},[19])(19)
});