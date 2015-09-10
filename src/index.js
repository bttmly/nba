
const find = require("lodash.find");
const contains = require("lodash.contains");

const getTeamsInfo = require("./team-info");
const sportVu = require("./sport-vu");
const api = require("./api");
const teams = require("../data/teams.json");
const players = require("../data/players.json");

function updatePlayers (cb) {
  return api.playersInfo(function (err, resp) {
    if (err) return cb(err);
    nba.teams = resp;
    cb(null, resp);
  });
}

function updateTeams (cb) {
  return getTeamsInfo(function (err, resp) {
    if (err) return cb(err);
    nba.players = resp;
    cb(null, resp);
  });
}

const nba = module.exports = {
  api,
  sportVu,
  players,
  updatePlayers,
  teams,
  updateTeams,

  teamIdFromName,
  playerIdFromName,
  findPlayer,
  searchPlayers,

  // backwards compatibility
  ready: (cb) => cb.call(nba),
};

function teamIdFromName (name) {
  let n = name.toLowerCase();
  let team = find(nba.teams, function (t) {
    return (
      t.abbreviation.toLowerCase() === n ||
      t.location.toLowerCase() === n ||
      t.teamName.toLowerCase() === n ||
      t.simpleName.toLowerCase() === n
    );
  });
  return team ? team.teamId : null;
}

function playerIdFromName (name) {
  let p = findPlayer(name);
  return p ? p.playerId : null;
}

function findPlayer (str) {
  str = str.toLowerCase();
  return find(nba.players, function (p) {
    return contains(p.fullName.toLowerCase(), str);
  });
}

function searchPlayers (str) {
  str = str.toLowerCase();
  return nba.players.filter(function (p) {
    return contains(p.fullName.toLowerCase(), str);
  });
}
