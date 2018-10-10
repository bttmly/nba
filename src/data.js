// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");

// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

module.exports = {
  scoreboard (date) {
    return getJson(scoreboardURL({ date: dateToYYYYMMDD(date) }));
  },

  boxScore (date, gameId) {
    return getJson(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
  },

  playByPlay (date, gameId) {
    return getJson(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
  },
};

function dateToYYYYMMDD (date) {
  if (date instanceof Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, 0),
      String(date.getDate()).padStart(2, 0),
    ].join("");
  }

  // TODO: better checking here?
  
  return date;
}