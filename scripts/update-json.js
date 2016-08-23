const fs = require("fs");
const path = require("path");

const playerInfo = require("../lib/player-info");
const teamInfo = require("../lib/team-info");

Promise.all([
  playerInfo().then(function (players) {
    const filePath = path.join(__dirname, "../data/players.json");
    const str = JSON.stringify(players, null, 2);
    fs.writeFileSync(filePath, str);
  }),
  teamInfo().then(function (teams) {
    const filePath = path.join(__dirname, "../data/teams.json");
    const str = JSON.stringify(teams, null, 2);
    fs.writeFileSync(filePath, str);
  }),
])
.catch(err => {
  console.log(err);
  process.exit(1);
});
