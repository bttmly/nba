const path = require("path");
const { REPLServer } = require("repl");

const Mocha = require("mocha");
const mocha = new Mocha({ timeout: 30000 });

mocha.addFile(path.join(__dirname, "integration/stats.js"));
mocha.addFile(path.join(__dirname, "integration/sport-vu.js"));

const repl = new REPLServer();

mocha.run(function(failures) {
  console.log("responses are loaded into global `StatsData` and `SportVuData` objects... Enjoy!");
  repl.start({ prompt: "🏀  > " });
});

module.exports = repl;
