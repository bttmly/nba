#!/usr/bin/env node

var fs = require("fs");
var path = require("path");

var updatePlayers = require("../lib/player-info");

updatePlayers(function (err, players) {
  if (err) {
    throw err;
  }
  var filePath = path.join(__dirname, "../data/players.json");
  var str;

  try {
    str = JSON.stringify(players, null, 2);
    JSON.parse(str);
  } catch (e) {
    throw new Error("Unable to parse JSON response: " + players);
  }

  fs.writeFileSync(filePath, str);
});
