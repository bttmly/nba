// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const util = require("util");

const SCOREBOARD_URL = "http://data.nba.com/data/5s/json/cms/noseason/scoreboard/%s/games.json";

module.exports = {
  // date should be in format like "20181008" (which indicates Oct 8 2018)
  // ALTERNATELY you can pass a Date object but beware of timezone weirdness!
  scoreboard (date) {
    let dateStr = date;
    if (date instanceof Date) {
      dateStr = [
        String(d.getDate()).padStart(2, 0),
        String(d.getMonth() + 1).padStart(2, 0),
        d.getFullYear(),
      ].join("");
    }

    return getJson(util.format(SCOREBOARD_URL, dateStr));
  },
};