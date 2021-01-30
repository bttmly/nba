// this includes endpoints at data.nba.com

const { defaultTransport } = require("./transport");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");
const scheduleURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/schedule.json");
const teamScheduleURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/teams/__teamId__/schedule.json");
const previewArticleURL = interpolate("https://data.nba.com/data/10s/prod/v1/__date__/__gameId___preview_article.json");
const recapArticleURL = interpolate("https://data.nba.com/data/10s/prod/v1/__date__/__gameId___recap_article.json");
const leadTrackerURL = interpolate("https://data.nba.com/data/10s/prod/v1/__date__/__gameId___lead_tracker___period__.json");
const playoffsBracketURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/playoffsBracket.json");
const teamLeadersURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/teams/__teamId__/leaders.json");
const teamStatsRankingsURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/team_stats_rankings.json");
const coachesURL = interpolate("https://data.nba.com/data/10s/prod/v1/__season__/coaches.json");
const teamsURL = interpolate("https://data.nba.net/data/10s/prod/v1/__year__/teams.json");

const calendarURL = "https://data.nba.net/data/10s/prod/v1/calendar.json";
const standingsURL = "https://data.nba.net/data/10s/prod/v1/current/standings_all.json";

// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

// NOTE: the 'season' argument is the first year of the NBA season e.g. "2018" for the 2018-19 season

const withTransport = (transportOverride) => {
  const transport = transportOverride || defaultTransport;

  const scoreboard = date => transport(scoreboardURL({ date: dateToYYYYMMDD(date) }));
  scoreboard.defaults = { date: null };

  const boxScore = (date, gameId) => transport(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
  boxScore.defaults = { date: null, gameId: null };

  const playByPlay = (date, gameId) => transport(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
  playByPlay.defaults = { date: null, gameId: null };

  const schedule = (season) => transport(scheduleURL({ season }));
  schedule.defaults = { season: null };

  const teamSchedule = (season, teamId) => transport(teamScheduleURL({ season, teamId }));
  teamSchedule.defaults = { season: null, teamId: null };

  const previewArticle = (date, gameId) => transport(previewArticleURL({date: dateToYYYYMMDD(date), gameId }));
  previewArticle.defaults = { date: null, gameId: null };

  const recapArticle = (date, gameId) => transport(recapArticleURL({date: dateToYYYYMMDD(date), gameId }));
  recapArticle.defaults = { date: null, gameId: null };

  const leadTracker = (date, gameId, period) => transport(leadTrackerURL({date: dateToYYYYMMDD(date), gameId, period }));
  leadTracker.defaults = { date: null, gameId: null, period: null };

  const playoffsBracket = (season) => transport(playoffsBracketURL({ season }));
  playoffsBracket.defaults = { season: null };

  const teamLeaders = (season, teamId) => transport(teamLeadersURL({ season, teamId }));
  teamLeaders.defaults = { season: null, teamId: null };

  const teamStatsRankings = (season) => transport(teamStatsRankingsURL({ season }));
  teamStatsRankings.defaults = { season: null };

  const coaches = (season) => transport(coachesURL({ season }));
  coaches.defaults = { season: null };

  const teams = (year = "2019") => transport(teamsURL({ year }));
  teams.defaults = { year: null };

  const calendar = () => transport(calendarURL);
  calendar.defaults = {};

  const standings = () => transport(standingsURL);
  standings.defaults = {};

  return {
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
    teams,
    calendar,
    standings,
  };
};

function dateToYYYYMMDD (date) {
  if (date instanceof Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, 0),
      String(date.getDate()).padStart(2, 0),
    ].join("");
  }
  return date;
}

const client = withTransport();

module.exports = {
  ...client,
  withTransport,
};