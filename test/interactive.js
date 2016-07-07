require("babel/register")({stage: 0});

var fs = require("fs");
var path = require("path");
var Repl = require("repl");

var Mocha = require("mocha");
var mocha = new Mocha({ timeout: 10000 });

mocha.addFile(path.join(__dirname, "integration/stats.js"));
mocha.addFile(path.join(__dirname, "integration/sport-vu.js"));

mocha.run(function (failures) {
  console.log("responses are loaded into global `StatsData` and `SportVuData` objects... Enjoy!");
  var r = Repl.start({ prompt: "🏀  > " });
});
