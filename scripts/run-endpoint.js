var nba = require("../").usePromises();
var endpoint = process.argv[2];
nba.stats[endpoint]().then(console.log);
