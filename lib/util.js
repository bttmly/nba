"use strict";

var partial = require("lodash.partial");
var assign = require("object-assign");
var findWhere = require("lodash.findWhere");

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
}

// translator maps old keys to new keys
function translateObjectKeys (translator, obj) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(translator, key)) {
      throw new Error("Key `" + key + "` not found in translator.");
    }
    result[translator[key]] = obj[key];
  });
  return result;
}

// detects whether a string contains a hyphen or dash
// (very rough way of detecting dashed or snake_case strings)
function hasUnderscoreOrHyphen (str) {
  return str.indexOf("-") > -1 || str.indexOf("_") > -1;
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst (str) {
  return str[0].toLowerCase() + str.slice(1);
}

// converts a dash or hypen separated string to camelCase
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

function baseResponseTransform (resp) {
  var data = resp.resultSets[0];
  var headers = data.headers.map(jsify);
  return collectify(headers, data.rowSet);
}

function generalResponseTransform (resp) {
  return resp.resultSets.reduce(function (ret, set) {
    var name = downcaseFirst(set.name);
    ret[name] = collectify(set.headers.map(jsify), set.rowSet);
    return ret;
  }, {});
}

function playersResponseTransform (resp) {
  return baseResponseTransform(resp)
    .map(function (player) {
      var result = {};
      var names = player.displayLastCommaFirst.split(", ").reverse();
      result.firstName = names[0].trim();
      result.lastName = (names[1] ? names[1] : "").trim(); // due to Nene
      result.playerId = player.personId;
      return result;
    });
}

function buildPlayers (players) {
  players.forEach(function (player) {
    player.fullName = player.firstName +
      (player.lastName ? " " + player.lastName : "");
    // player.downcaseName = player.fullName.toLowerCase();
  });
  return players;
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
    return assign.apply(null, items);
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
  var date = new Date(param);

  if (isNaN(date)) {
    throw new Error("Invalid Date");
  }

  return [
    padValue(date.getMonth() + 1),
    padValue(date.getDate()),
    date.getFullYear()
  ].join(joinChar || "/");

  function padValue (num) {
    num = String(num);
    return num.length === 1 ? "0" + num : num;
  }
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

module.exports = {
  downcaseFirst: downcaseFirst,
  hasUnderscoreOrHyphen: hasUnderscoreOrHyphen,
  unDashHyphen: unDashHyphen,
  makeDict: makeDict,
  usDateFormat: usDateFormat,
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  pickKeys: pickKeys,
  collectify: collectify,
  translateKeys: translateKeys,
  mergeCollections: mergeCollections,
  baseResponseTransform: baseResponseTransform,
  generalResponseTransform: generalResponseTransform,
  playersResponseTransform: playersResponseTransform,
  translateObjectKeys: translateObjectKeys,
  buildPlayers: buildPlayers
};
