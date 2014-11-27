"use strict";

var getTeamsInfo = require("./info-teams");
var util = require("./util");
var api = require("./api");

var playersPromise, teamsPromise, readyPromise;

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
    var player = util.findWhere({ fullName: name }, this.playersInfo);
    return player ? player.playerId : null;
  },
  findPlayer: function (str) {
    return util.find(util.partial(util.contains, str), this.playersInfo);
  },
  searchPlayers: function (str) {
    str = str.toLowerCase();
    return this.playersInfo.filter(function (player) {
      return player.downcaseName.indexOf(str) !== -1;
    });
  },
  teamIdFromName: function (name) {
    var team = util.findWhereAny({
      abbreviation: name,
      teamName: name,
      simpleName: name
    }, this.teamsInfo);
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
      isReady = true
      return doReady()
    }
    _teams(function (err) {
      if (err) {
        readyArg = err;
      }
      isReady = true;
      return doReady();
    });
  });
}

init();

module.exports = nba;
