#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var nba = require("../src");
const https = require('https');

/* 
  We have 2 arrays of players:
  - one from https://stats.nba.com/js/data/ptsd/stats_ptsd.js (with all-time players, but without teams)
  - one received from nba.stats.playersInfo() function (with only active players)
  In order to have an unique array with both information, I'm going to merge them.
*/

// retrieve all-time players array
https.get('https://stats.nba.com/js/data/ptsd/stats_ptsd.js', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Parse the result.
  resp.on('end', () => {
    // remove the first part of the received message to parse it (I don't want to eval the reveiveid message)
    data = data.substring("var stats_ptsd = ".length);
    // remove the last ';'
    data = data.substring(0, data.length - 1);
    // finally, parse the object
    const stats_json = JSON.parse(data);

    let all_players = stats_json.data.players.map((currentValue) => {
      // split first and last names
      var nameArr = currentValue[1].split(',');
      if (nameArr.length == 1) {
        // for example "Nene" hasn't fave a lastName
        return { "firstName": nameArr[0], "lastName": "", "playerId": currentValue[0] };
      } else if (nameArr.length >= 2) {
        // note that there could be more that one commas (e.g. "Hoffman, Bear, The Body")
        return { "firstName": currentValue[1].substring(nameArr[0].length + 2).trim(), "lastName": nameArr[0].trim(), "playerId": currentValue[0] };
      } else {
        console.error("Error parsing: " + currentValue);
        process.exit(1);
      }
    });

    // retrieve active players array
    nba.stats.playersInfo()
      .then(function (players) {
        // should always be around 450
        if (players.length < 440) {
          throw new Error(`Expected around 450 players, found only ${players.length}`);
        }

        var filePath = path.join(__dirname, "../data/players.json");
        var str;

        all_players = all_players.map((value) => {
          const found = players.find(function (element) {
            return element.playerId === value.playerId;
          });
          if (found !== undefined)
            value.teamId = found.teamId;
          return value;
        });

        try {
          str = JSON.stringify(all_players, null, 2);
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

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
