"use strict";

var find = require("lodash.find");
var contains = require("lodash.contains");

var getTeamsInfo = require("./team-info");
var sportVu = require("./sport-vu");
var api = require("./api");
var teams = require("../data/teams.json");
var players = require("../data/players.json");

function updatePlayers(cb) {
  return api.playersInfo(function (err, resp) {
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

var nba = module.exports = {
  api: api,
  sportVu: sportVu,
  players: players,
  updatePlayers: updatePlayers,
  teams: teams,
  updateTeams: updateTeams,

  teamIdFromName: teamIdFromName,
  playerIdFromName: playerIdFromName,
  findPlayer: findPlayer,
  searchPlayers: searchPlayers,

  // backwards compatibility
  ready: function ready(cb) {
    return cb.call(nba);
  }
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