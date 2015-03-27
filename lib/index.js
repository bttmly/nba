"use strict";

var find = require("lodash.find");
var contains = require("lodash.contains");

var getTeamsInfo = require("./info-teams");
var util = require("./util");
var api = require("./api");

var nba = {};

function updatePlayersInfo (cb) {
  return api.playersInfo(function (err, resp) {
    nba.teamsInfo = resp;
    cb(err, resp);
  });
}

function updateTeamsInfo (cb) {
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
  updatePlayersInfo: updatePlayersInfo,
  teamsInfo: require("../data/teams.json"),
  updateTeamsInfo: updateTeamsInfo,
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
    var p = nba.findPlayer(name);
    return p ? p.playerId : null;
  },
  findPlayer: function (str) {
    str = str.toLowerCase();
    return find(nba.playersInfo, function (p) {
      return contains(p.fullName.toLowerCase(), str);
    });
  },
  searchPlayers: function (str) {
    str = str.toLowerCase();
    return nba.playersInfo.filter(function (p) {
      return contains(p.fullName.toLowerCase(), str);
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

  var _players = nba.playersInfo.length ? dummy : updatePlayersInfo;
  var _teams = nba.teamsInfo.length ? dummy : updateTeamsInfo;

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
