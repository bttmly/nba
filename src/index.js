
const find = require("lodash.find");
const contains = require("lodash.contains");

const getTeamsInfo = require("./team-info");
const sportVu = require("./sport-vu");
const stats = require("./stats");
const {promisify, promisifyAll} = require("./util/promisify");
const teams = require("../data/teams.json");
const players = require("../data/players.json");

const nba = {
  stats,
  sportVu,
  players,
  updatePlayers,
  teams,
  updateTeams,

  teamIdFromName,
  playerIdFromName,
  findPlayer,
  searchPlayers,
  usePromises,

  // backwards compatibility
  ready: (cb) => cb.call(nba),
  api: stats,
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
    console.log(p);
    return contains(p.fullName.toLowerCase(), str);
  });
}

function searchPlayers (str) {
  str = str.toLowerCase();
  return nba.players.filter(function (p) {
    return contains(p.fullName.toLowerCase(), str);
  });
}

function updatePlayers (cb) {
  return stats.playersInfo(function (err, resp) {
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

function usePromises (Prms) {
  Prms = Prms || global.Promise;
  if (!Prms) throw new Error("Invalid Promise implementation");
  let _promisify = promisify(Prms);
  nba.stats = promisifyAll(stats, Prms);
  nba.sportVu = promisifyAll(sportVu, Prms);
  nba.updatePlayers = _promisify(updatePlayers);
  nba.updateTeams = _promisify(updateTeams);
  return nba;
}

module.exports = nba;