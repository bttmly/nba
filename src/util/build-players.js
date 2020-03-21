function buildPlayers (players) {
  return players.map((player) => ({
    ...player,
    fullName: fullName(player),
    downcaseName: fullName(player).toLowerCase(),
  }));
}

function fullName (player) {
  return player.firstName + (player.lastName ? " " + player.lastName : "");
}

module.exports = buildPlayers;