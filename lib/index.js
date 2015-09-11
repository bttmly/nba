"use strict";

var find = require("lodash.find");
var contains = require("lodash.contains");

var getTeamsInfo = require("./team-info");
var sportVu = require("./sport-vu");
var stats = require("./stats");
var buildPlayers = require("./util/build-players");

var _require = require("./util/promisify");

var promisify = _require.promisify;
var promisifyAll = _require.promisifyAll;

var teams = require("../data/teams.json");
var players = buildPlayers(require("../data/players.json"));

var nba = {
  stats: stats,
  sportVu: sportVu,
  players: players,
  updatePlayers: updatePlayers,
  teams: teams,
  updateTeams: updateTeams,

  teamIdFromName: teamIdFromName,
  playerIdFromName: playerIdFromName,
  findPlayer: findPlayer,
  searchPlayers: searchPlayers,
  usePromises: usePromises,

  // backwards compatibility
  ready: function ready(cb) {
    return cb.call(nba);
  },
  api: stats
};

function teamIdFromName(name) {
  var n = name.toLowerCase();
  var team = find(nba.teams, function (t) {
    return t.abbreviation.toLowerCase() === n || t.location.toLowerCase() === n || t.teamName.toLowerCase() === n || t.simpleName.toLowerCase() === n;
  });
  return team ? team.teamId : null;
}

function playerIdFromName(name) {
  var p = findPlayer(name);
  return p ? p.playerId : null;
}

function findPlayer(str) {
  str = str.toLowerCase();
  return find(nba.players, function (p) {
    return contains(p.fullName.toLowerCase(), str);
  });
}

function searchPlayers(str) {
  str = str.toLowerCase();
  return nba.players.filter(function (p) {
    return contains(p.fullName.toLowerCase(), str);
  });
}

function updatePlayers(cb) {
  return stats.playersInfo(function (err, resp) {
    if (err) return cb(err);
    nba.teams = resp;
    cb(null, resp);
  });
}

function updateTeams(cb) {
  return getTeamsInfo(function (err, resp) {
    if (err) return cb(err);
    nba.players = resp;
    cb(null, resp);
  });
}

function usePromises(Prms) {
  Prms = Prms || global.Promise;
  if (typeof Prms !== "function") {
    throw new Error("Invalid Promise implementation");
  }

  var _promisify = promisify(Prms);
  nba.stats = promisifyAll(stats, Prms);
  nba.sportVu = promisifyAll(sportVu, Prms);
  nba.updatePlayers = _promisify(updatePlayers);
  nba.updateTeams = _promisify(updateTeams);
  return nba;
}

module.exports = nba;