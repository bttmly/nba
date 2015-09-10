"use strict";

const mergeCollections = require("./util/merge-collections");
const blank = require("./util/blank");
const api = require("./api");

const pick = require("lodash.pick");

const TWO_WORD_TEAMS = blank({
  "Portland Trail Blazers": true
});

// adds location city and short name (i.e. 'Warriors') data to team objects.
function addExtraTeamData (team) {
  team.teamName = team.teamName.trim();
  const splitted = team.teamName.split(" ");
  if (TWO_WORD_TEAMS[team.teamName]) {
    team.simpleName = splitted.splice(-2, 2).join(" ");
  } else {
    team.simpleName = splitted.splice(-1, 1).join();
  }
  team.location = splitted.join(" ");
  return team;
}

module.exports = function teamInfo (cb) {
  const results = new Array(2);

  api.teamStats(function (err, response) {
    if (err) return cb(err);
    results[0] = response;
    if (results[1]) andThen(results);
  });

  api.teamYears(function (err, response) {
    if (err) return cb(err);
    results[1] = response;
    if (results[0]) andThen(results);
  });

  function andThen (responses) {
    let data = mergeCollections("teamId", responses[0], responses[1]);
    data = data.map(function (d) {
      return addExtraTeamData(pick(d, "teamId", "abbreviation", "teamName"));
    });
    cb(null, data);
  }
};