// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");
const scheduleURL = interpolate("http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/__season__/league/00_full_schedule.json");


// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

const scoreboard = date => getJson(scoreboardURL({ date: dateToYYYYMMDD(date) }));
scoreboard.defaults = { date: null };

const boxScore = (date, gameId) => getJson(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
boxScore.defaults = { date: null, gameId: null };

const playByPlay = (date, gameId) => getJson(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
playByPlay.defaults = { date: null, gameId: null };

// NOTE: the 'season' argument is the first year of the NBA season e.g. "2018" for the 2018-19 season
// 2015 is the first valid season 

const schedule = (season) => getJson(scheduleURL({ season }));
schedule.defaults = { season: null };

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

module.exports = {
  scoreboard,
  boxScore,
  playByPlay,
  schedule
};