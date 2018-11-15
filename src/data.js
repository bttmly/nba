// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("http://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");


export const CALENDAR = {
  method: "calendar",
  endpoint: "/data/10s/prod/v1/calendar.json"
};

export const SCOREBOARD = {
  method: "scoreboard",
  endpoint: "/data/10s/prod/v1/{{date}}/scoreboard.json"
};

export const TEAMS = {
  method: "teams",
  endpoint: "/data/10s/prod/v1/{{year}}/teams.json"
};

export const LEAGUE_ROSTER_PLAYERS = {
  method: "players",
  endpoint: "/data/10s/prod/v1/{{year}}/players.json"
};

export const LEAGUE_ROSTER_COACHES = {
  method: "coaches",
  endpoint: "/data/10s/prod/v1/{{year}}/coaches.json"
};

export const LEAGUE_SCHEDULE = {
  method: "schedule",
  endpoint: "/data/10s/prod/v1/{{year}}/schedule.json"
};

export const LEAGUE_CONFERENCE_STANDINGS = {
  method: "conferenceStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_conference.json"
};

export const LEAGUE_DIVISION_STANDINGS = {
  method: "divisionStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_division.json"
};

export const LEAGUE_UNGROUPED_STANDINGS = {
  method: "standings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_all.json"
};

export const LEAGUE_MINI_STANDINGS = {
  method: "miniStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_all_no_sort_keys.json"
};

export const LEAGUE_TEAM_STATS_LEADERS = {
  method: "teamStatsLeaders",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json"
};

export const LEAGUE_LAST_FIVE_GAME_TEAM_STATS = {
  method: "lastFiveGameTeamStats",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_last_five_games.json"
};

export const PREVIEW_ARTICLE = {
  method: "previewArticle",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_preview_article.json"
};

export const RECAP_ARTICLE = {
  method: "recapArticle",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_recap_article.json"
};

export const BOXSCORE = {
  method: "boxscore",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_boxscore.json"
};

export const MINI_BOXSCORE = {
  method: "miniBoxscore",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_mini_boxscore.json"
};

export const PLAY_BY_PLAY = {
  method: "pbp",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_pbp_{{period}}.json"
};

export const LEAD_TRACKER = {
  method: "leadTracker",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_lead_tracker_{{period}}.json"
};

export const PLAYER_GAMELOG = {
  method: "playerGamelog",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_gamelog.json"
};

export const PLAYER_PROFILE = {
  method: "playerProfile",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_profile.json"
};

export const PLAYER_UBER_STATS = {
  method: "playerUberStats",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_uber_stats.json"
};

export const PLAYOFFS_BRACKET = {
  method: "playoffsBracket",
  endpoint: "/data/10s/prod/v1/{{year}}/playoffsBracket.json"
};

export const TEAM_SCHEDULE = {
  method: "teamSchedule",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json"
};

export const TEAMS_CONFIG = {
  method: "teamsConfig",
  endpoint: "/data/1h/prod/{{year}}/teams_config.json"
};

export const TEAM_ROSTER = {
  method: "teamRoster",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/roster.json"
};

export const TEAMS_CONFIG_YEAR = {
  method: "teamsConfigYear",
  endpoint: "/data/1h/prod/{{year}}/teams_config.json"
};

export const TEAM_SCHEDULE_YEAR = {
  method: "teamScheduleYear",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json"
};

export const TEAM_LEADERS = {
  method: "teamLeaders",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/leaders.json"
};

export const TEAM_STATS_RANKINGS = {
  method: "teamStatsRankings",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json"
};


// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

const scoreboard = date => getJson(scoreboardURL({ date: dateToYYYYMMDD(date) }));
scoreboard.defaults = { date: null };

const boxScore = (date, gameId) => getJson(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
boxScore.defaults = { date: null, gameId: null };

const playByPlay = (date, gameId) => getJson(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
playByPlay.defaults = { date: null, gameId: null };

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
};