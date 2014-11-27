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
