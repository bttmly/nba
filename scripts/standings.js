#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const nba = require("../src/index");

nba.stats.leagueStandings()
  .then((standings) => {
    const filePath = path.join(__dirname, "../data/standings.json");
    let str;
    try {
      str = JSON.stringify(standings);
      JSON.parse(str);
    } catch (e) {
      throw new Error("Unable to parse JSON response: " + e);
    }
    fs.writeFileSync(filePath, str);
  })
  .catch(function (err) {
    console.log(err);
    process.exit(1);
  });

