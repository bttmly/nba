"use strict";

var util = require("./util");

var DEFAULT_SEASON = "2014-15";

function boxScoreDefaults () {
  return {"GameID": "0", "RangeType": "0", "StartPeriod": "0", "EndPeriod": "0", "StartRange": "0", "EndRange": "0"};
}

var endpoints = {
  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "LeagueID": "00", "PlayerID": "0", "GraphStartSeason": "2009-10", "GraphEndSeason": "2014-15", "GraphStat": "PTS"};
    },
    transform: util.generalResponseTransform
  },
  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: function () {
      return {"PlayerID": "0", "SeasonType": "Regular Season", "LeagueID": "00", "asynchFlag": "true"};
    },
    transform: util.generalResponseTransform
  },
  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: function () {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "IsOnlyCurrentSeason": "1"};
    },
    transform: util.playersResponseTransform
  },
  teamStats: {
    url: "http://stats.nba.com/stats/leaguedashteamstats",
    defaults: function () {
      return {"Season": "2013-14", "AllStarSeason": "", "SeasonType": "Regular Season", "LeagueID": "00", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": "", "PlayerExperience": "", "PlayerPosition": "", "StarterBench": ""};
    },
    transform: util.baseResponseTransform
  },
  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "LeagueID": "00", "TeamID": "0", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": ""};
    },
    transform: util.generalResponseTransform
  },
  teamYears: {
    url: "http://stats.nba.com/stats/commonteamyears",
    defaults: function () {
      return {"LeagueID": "00"};
    },
    transform: util.baseResponseTransform
  },
  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: function () {
      return {"Season": DEFAULT_SEASON, "SeasonType": "Playoffs", "LeagueID": "00", "PlayerID": "0", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  },
  // does shots need playerId?
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: function () {
      return {"PlayerID": "0", "Season": DEFAULT_SEASON, "AllStarSeason": "", "SeasonType": "Regular Season", "LeagueID": "00", "TeamID": "", "GameID": "", "Position": "", "RookieYear": "", "ContextMeasure": "FG_PCT", "MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0", "GameScope": "", "PlayerExperience": "", "PlayerPosition": "", "StarterBench": ""};
    },
    transform: util.generalResponseTransform
  },
  scoreboard: {
    url: "http://stats.nba.com/stats/scoreboard",
    defaults: function () {
      return {"LeagueID": "00", "gameDate": "01/01/2000", "DayOffset": "0"};
    },
    transform: util.generalResponseTransform
  },
  playByPlay: {
    url: "http://stats.nba.com/stats/playbyplay",
    defaults: function () {
      return {"GameID": "0", "StartPeriod": "0", "EndPeriod": "0"};
    },
    transform: util.generalResponseTransform
  },
  boxScoreScoring: {
    url: "http://stats.nba.com/stats/boxscorescoring",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreUsage: {
    url: "http://stats.nba.com/stats/boxscoreusage",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreMisc: {
    url: "http://stats.nba.com/stats/boxscoremisc",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreAdvanced: {
    url: "http://stats.nba.com/stats/boxscoreadvanced",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  boxScoreFourFactors: {
    url: "http://stats.nba.com/stats/boxscorefourfactors",
    defaults: boxScoreDefaults,
    transform: util.generalResponseTransform
  },
  teamHistoricalLeaders: {
    url: "http://stats.nba.com/stats/teamhistoricalleaders",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  teamInfoCommon: {
    url: "http://stats.nba.com/stats/teaminfocommon",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  commonTeamRoster: {
    url: "http://stats.nba.com/stats/commonteamroster",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "TeamID": "0"};
    },
    transform: util.generalResponseTransform
  },
  teamPlayerDashboard: {
    url: "http://stats.nba.com/stats/teamplayerdashboard",
    defaults: function() {
      return {"MeasureType": "Base", "PerMode": "PerGame", "PlusMinus": "N", "PaceAdjust": "N", "Rank": "N", "LeagueID": "00", "Season": DEFAULT_SEASON,
              "TeamID": "0", "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "", "VsDivision": "",
              "GameSegment": "", "Period": "0", "LastNGames": "0" };
    },
    transform: util.generalResponseTransform
  },
  playerDashPtShotLog: {
    url: "http://stats.nba.com/stats/playerdashptshotlog",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "PlayerID": "0", "TeamID": "0", "MeasureType": "Base",
              "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "",
              "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  },
  playerDashPtReboundLogs: {
    url: "http://stats.nba.com/stats/playerdashptreboundlogs",
    defaults: function() {
      return {"LeagueID": "00", "Season": DEFAULT_SEASON, "SeasonType": "Regular Season", "PlayerID": "0", "TeamID": "0",
              "Outcome": "", "Location": "", "Month": "0", "SeasonSegment": "", "DateFrom": "", "DateTo": "", "OpponentTeamID": "0", "VsConference": "",
              "VsDivision": "", "GameSegment": "", "Period": "0", "LastNGames": "0"};
    },
    transform: util.generalResponseTransform
  }
};

module.exports = endpoints;
