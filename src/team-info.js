const stats = require("./stats");

const TWO_WORD_TEAMS = {
  "Portland Trail Blazers": true,
};

// adds location city and short name (i.e. 'Warriors') data to team objects.
function formatTeam ({ teamId, abbreviation, teamName: rawTeamName }) {
  const teamName = rawTeamName.trim();
  const splitted = teamName.split(" ");
  const simpleName = TWO_WORD_TEAMS[rawTeamName] ?
    splitted.splice(-2, 2).join(" ") :
    splitted.splice(-1, 1).join();
  const location = splitted.join(" ");

  return {
    teamId,
    abbreviation,
    teamName,
    simpleName,
    location,
  };
}

async function teamInfo () {
  const [teamStats, teamYears] = await Promise.all([
    stats.teamStats(),
    stats.teamYears(),
  ]);

  const result = mergeCollections("teamId", teamStats, teamYears)
    .map(formatTeam);
  return result;
}

module.exports = teamInfo;

// any items in B without a corresponding A will be dropped
function mergeCollections (idProp, listA, listB) {
  return listA.map(function (itemA) {
    const itemB = listB.find(it => it[idProp] === itemA[idProp]);
    return { ...itemA, ...itemB };
  });
};