var nba = require("../").usePromises();
var endpoint = process.argv[2];

var props = process.argv.slice(3).reduce(function (o, s) {
  var split = s.split("=");
  o[split[0]] = split[1];
  return o;
}, {});

nba.stats[endpoint](props).then(console.log);
