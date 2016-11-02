const mergeCollections = require("./util/merge-collections");
const blank = require("./util/blank");
const stats = require("./stats");

const pick = require("lodash.pick");

const TWO_WORD_TEAMS = blank({
  "Portland Trail Blazers": true,
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

function teamInfo () {
  return Promise.all([
    stats.teamStats(),
    stats.teamYears(),
  ]).then(function ([teamStats, teamYears]) {
    return mergeCollections("teamId", teamStats, teamYears).map(function (d) {
      return addExtraTeamData(pick(d, "teamId", "abbreviation", "teamName"));
    });
  });
}

module.exports = teamInfo;
