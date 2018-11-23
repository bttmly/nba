// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { URL } = require("url");
const _interpolate = require("interpolate");

const dataAPITemplate = {
  default_host: "https://data.nba.com",
  endpoints: [
    {
      method: "calendar",
      endpoint: "/data/10s/prod/v1/calendar.json",
    },
    {
      method: "scoreboard",
      endpoint: "/data/10s/prod/v1/{{date}}/scoreboard.json",
    },
    {
      method: "teams",
      endpoint: "/data/10s/prod/v1/{{year}}/teams.json",
    },
    {
      method: "players",
      endpoint: "/data/10s/prod/v1/{{year}}/players.json",
    },
    {
      method: "coaches",
      endpoint: "/data/10s/prod/v1/{{year}}/coaches.json",
    },
    {
      method: "schedule",
      endpoint: "/data/10s/prod/v1/{{year}}/schedule.json",
    },
    {
      method: "conferenceStandings",
      endpoint: "/data/10s/prod/v1/{{date}}/standings_conference.json",
    },
    {
      method: "divisionStandings",
      endpoint: "/data/10s/prod/v1/{{date}}/standings_division.json",
    },
    {
      method: "standings",
      endpoint: "/data/10s/prod/v1/{{date}}/standings_all.json",
    },
    {
      method: "miniStandings",
      endpoint: "/data/10s/prod/v1/{{date}}/standings_all_no_sort_keys.json",
    },
    {
      method: "teamStatsLeaders",
      endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json",
    },
    {
      method: "lastFiveGameTeamStats",
      endpoint: "/data/10s/prod/v1/{{year}}/team_stats_last_five_games.json",
    },
    {
      method: "previewArticle",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_preview_article.json",
    },
    {
      method: "recapArticle",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_recap_article.json",
    },
    {
      method: "boxscore",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_boxscore.json",
    },
    {
      method: "miniBoxscore",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_mini_boxscore.json",
    },
    {
      method: "pbp",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_pbp_{{period}}.json",
    },
    {
      method: "playByPlay",
      endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_full_pbp.json",
    },
    {
      method: "leadTracker",
      endpoint:
        "/data/10s/prod/v1/{{date}}/{{gameId}}_lead_tracker_{{period}}.json",
    },
    {
      method: "playerGamelog",
      endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_gamelog.json",
    },
    {
      method: "playerProfile",
      endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_profile.json",
    },
    {
      method: "playerUberStats",
      endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_uber_stats.json",
    },
    {
      method: "playoffsBracket",
      endpoint: "/data/10s/prod/v1/{{year}}/playoffsBracket.json",
    },
    {
      method: "teamSchedule",
      endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json",
    },
    {
      method: "teamsConfig",
      endpoint: "/data/1h/prod/{{year}}/teams_config.json",
    },
    {
      method: "teamRoster",
      endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/roster.json",
    },
    {
      method: "teamsConfigYear",
      endpoint: "/data/1h/prod/{{year}}/teams_config.json",
    },
    {
      method: "teamScheduleYear",
      endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json",
    },
    {
      method: "teamLeaders",
      endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/leaders.json",
    },
    {
      method: "teamStatsRankings",
      endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json",
    },
  ],
};

// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

function dateToYYYYMMDD(date) {
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

function generateEndpoint(pathTpl, transport, host) {
  const tpl = interpolate(pathTpl);
  
  function endpoint(_params) {
    const params = { ..._params };
    if (params.date) {
      params.date = dateToYYYYMMDD(params.date);
    }
    const url = new URL(host);
    url.pathname = tpl(params);
    return transport(url.toString());
  }
  
  endpoint.params = extractParameters(pathTpl);
  return endpoint;
}

function interpolate(str) {
  return function(obj) {
    return _interpolate(str, obj, { delimiter: "{{}}" });
  };
}

function extractParameters(url) {
  const matches = url.match(/\$\{(\w+)\}/g);
  const result = [];
  if (matches == null) return result;
  for (const m of matches) {
    result.push(m.slice(2 - 1));
  }
  return result;
}

function makeClient (transport, host = dataAPITemplate.default_host) {
  const client = {};
  for (const { method, endpoint } of dataAPITemplate.endpoints) {
    client[method] = generateEndpoint(endpoint, transport, host);
  }
  client.withTransport = makeClient;
  return client;
}

module.exports = makeClient(getJson);
