#!/usr/bin/env node

var fs = require("fs");
var path = require("path");

var updateTeams = require("../lib").updateTeams;

updateTeams(function (err, teams) {
  var filePath = path.join(__dirname, "../data/teams.json");
  var str;

  try {
    str = JSON.stringify(teams, null, 2);
    JSON.parse(str);
  } catch (e) {
    throw new Error("Unable to parse JSON response: " + teams);
  }

  fs.writeFileSync(filePath, str);

});
