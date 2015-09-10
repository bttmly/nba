function buildPlayers (_players) {
  const players = [..._players];

  players.forEach(function (player) {
    player.fullName = player.firstName +
      (player.lastName ? " " + player.lastName : "");
    player.downcaseName = player.fullName.toLowerCase();
  });
  
  return players;
}

module.exports = buildPlayers;