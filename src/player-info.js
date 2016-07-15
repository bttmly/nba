const stats = require("./stats");

function playerInfo () {
  return stats.playersInfo().then(function (resp) {
    const players = resp.resultSets[0].rowSet;
    return players.map(makePlayer);
  });
}

module.exports = playerInfo;

function makePlayer (tuple) {
  const playerId = tuple[0];
  const [lastName, firstName] = tuple[1].split(", ");
  const teamId = tuple[7];
  return { firstName, lastName, playerId, teamId };
}
