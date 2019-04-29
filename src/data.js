// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");
const scheduleURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/schedule.json");
const teamScheduleURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/teams/__teamId__/schedule.json");
const previewArticleURL = interpolate("http://data.nba.com/data/10s/prod/v1/__date__/__gameId___preview_article.json");
const recapArticleURL = interpolate("http://data.nba.com/data/10s/prod/v1/__date__/__gameId___recap_article.json");
const leadTrackerURL = interpolate("http://data.nba.com/data/10s/prod/v1/__date__/__gameId___lead_tracker___period__.json");
const playoffsBracketURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/playoffsBracket.json");
const teamLeadersURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/teams/__teamId__/leaders.json");
const teamStatsRankingsURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/team_stats_rankings.json");
const coachesURL = interpolate("http://data.nba.com/data/10s/prod/v1/__season__/coaches.json");


// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

// NOTE: the 'season' argument is the first year of the NBA season e.g. "2018" for the 2018-19 season

const scoreboard = date => getJson(scoreboardURL({ date: dateToYYYYMMDD(date) }));
scoreboard.defaults = { date: null };

const boxScore = (date, gameId) => getJson(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
boxScore.defaults = { date: null, gameId: null };

const playByPlay = (date, gameId) => getJson(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
playByPlay.defaults = { date: null, gameId: null };

const schedule = (season) => getJson(scheduleURL({ season }));
schedule.defaults = { season: null };

const teamSchedule = (season, teamId) => getJson(teamScheduleURL({ season, teamId }));
teamSchedule.defaults = { season: null, teamId: null };

const previewArticle = (date, gameId) => getJson(previewArticleURL({date: dateToYYYYMMDD(date), gameId }));
previewArticle.defaults = { date: null, gameId: null };

const recapArticle = (date, gameId) => getJson(recapArticleURL({date: dateToYYYYMMDD(date), gameId }));
recapArticle.defaults = { date: null, gameId: null };

const leadTracker = (date, gameId, period) => getJson(leadTrackerURL({date: dateToYYYYMMDD(date), gameId, period }));
leadTracker.defaults = { date: null, gameId: null, period: null };

const playoffsBracket = (season) => getJson(playoffsBracketURL({ season }));
playoffsBracket.defaults = { season: null };

const teamLeaders = (season, teamId) => getJson(teamLeadersURL({ season, teamId }));
teamLeaders.defaults = { season: null, teamId: null };

const teamStatsRankings = (season) => getJson(teamStatsRankingsURL({ season }));
teamStatsRankings.defaults = { season: null };

const coaches = (season) => getJson(coachesURL({ season }));
coaches.defaults = { season: null };

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
  schedule,
  teamSchedule,
  previewArticle,
  recapArticle,
  leadTracker,
  playoffsBracket,
  teamLeaders,
  teamStatsRankings,
  coaches,
};