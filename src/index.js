const getTeamsInfo = require("./team-info");

const sportVu = require("./sport-vu");
const stats = require("./stats");
const synergy = require("./synergy");
const data = require("./data"); 

const teams = require("../data/teams.json");
const buildPlayers = require("./util/build-players");

const players = buildPlayers(require("../data/players.json"));

const nba = {
  // namespaces for NBA API endpoints
  stats,
  sportVu,
  synergy,
  data,

  // in-memory data to help with constructing queries
  players,
  teams,

  // helpers for searching in-memory data
  teamIdFromName,
  playerIdFromName,
  findPlayer,
  searchPlayers,

  // update in-memory data
  updatePlayers,
  updateTeams,
};

function teamIdFromName (name) {
  const n = name.toLowerCase();
  const team = nba.teams.find(function (t) {
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
  const p = findPlayer(name);
  return p ? p.playerId : null;
}

function findPlayer (str) {
  str = str.toLowerCase();
  return nba.players.find(function (p) {
    return p.fullName.toLowerCase().includes(str);
  });
}

function searchPlayers (str) {
  str = str.toLowerCase();
  return nba.players.filter(function (p) {
    return p.fullName.toLowerCase().includes(str);
  });
}

function updatePlayers () {
  return nba.stats.playersInfo().then(function (result) {
    nba.players = buildPlayers(result);
    return result;
  });
}

function updateTeams () {
  return getTeamsInfo().then(function (result) {
    nba.teams = result;
    return result;
  });
}

module.exports = nba;
