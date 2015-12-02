const stats = require("./stats");

module.exports = function (cb) {
  stats.playersInfo(function (err, resp) {
    if (err) return cb(err);
    const players = resp.resultSets[0].rowSet;
    cb(null, players.map(makePlayer));

  });
};

function makePlayer (tuple) {
  const playerId = tuple[0];
  const [lastName, firstName] = tuple[1].split(", ");
  const teamId = tuple[6];
  return { firstName, lastName, playerId, teamId };
}
