#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var nba = require("../lib");

nba.stats.playersInfo()
  .then(function (players) {
    // should always be around 450
    if (players.length < 440) {
      throw new Error(`Expected around 450 players, found only ${players.length}`);
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
  })
  .catch(function (err) {
    console.log(err);
    process.exit(1);
  });
