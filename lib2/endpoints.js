"use strict";

var _require = require("./transforms");

var general = _require.general;
var player = _require.player;
var base = _require.base;

var DEFAULT_SEASON = "2014-15";

var boxScoreDefaults = {
  "GameID": "0",
  "RangeType": "0",
  "StartPeriod": "0",
  "EndPeriod": "0",
  "StartRange": "0",
  "EndRange": "0"
};

module.exports = {

  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: {
      "Season": DEFAULT_SEASON,
      "SeasonType": "Regular Season",
      "LeagueID": "00",
      "PlayerID": "0",
      "GraphStartSeason": "2009-10",
      "GraphEndSeason": "2014-15",
      "GraphStat": "PTS"
    },
    transform: general
  },

  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: {
      "PlayerID": "0",
      "SeasonType": "Regular Season",
      "LeagueID": "00",
      "asynchFlag": "true"
    },
    transform: general
  },

  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "IsOnlyCurrentSeason": "1"
    },
    transform: player
  },

  teamStats: {
    url: "http://stats.nba.com/stats/leaguedashteamstats",
    defaults: {
      "Season": "2013-14",
      "AllStarSeason": "",
      "SeasonType": "Regular Season",
      "LeagueID": "00",
      "MeasureType": "Base",
      "PerMode": "PerGame",
      "PlusMinus": "N",
      "PaceAdjust": "N",
      "Rank": "N",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0",
      "GameScope": "",
      "PlayerExperience": "",
      "PlayerPosition": "",
      "StarterBench": ""
    },
    transform: base
  },

  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: {
      "Season": DEFAULT_SEASON,
      "SeasonType": "Regular Season",
      "LeagueID": "00",
      "TeamID": "0",
      "MeasureType": "Base",
      "PerMode": "PerGame",
      "PlusMinus": "N",
      "PaceAdjust": "N",
      "Rank": "N",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0",
      "GameScope": ""
    },
    transform: general
  },

  teamYears: {
    url: "http://stats.nba.com/stats/commonteamyears",
    defaults: {
      "LeagueID": "00"
    },
    transform: base
  },

  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: {
      "Season": DEFAULT_SEASON,
      "SeasonType": "Playoffs",
      "LeagueID": "00",
      "PlayerID": "0",
      "MeasureType": "Base",
      "PerMode": "PerGame",
      "PlusMinus": "N",
      "PaceAdjust": "N",
      "Rank": "N",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0"
    },
    transform: general
  },

  // does shots *need* playerId?
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: {
      "PlayerID": "0",
      "Season": DEFAULT_SEASON,
      "AllStarSeason": "",
      "SeasonType": "Regular Season",
      "LeagueID": "00",
      "TeamID": "",
      "GameID": "",
      "Position": "",
      "RookieYear": "",
      "ContextMeasure": "FG_PCT",
      "MeasureType": "Base",
      "PerMode": "PerGame",
      "PlusMinus": "N",
      "PaceAdjust": "N",
      "Rank": "N",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0",
      "GameScope": "",
      "PlayerExperience": "",
      "PlayerPosition": "",
      "StarterBench": ""
    },
    transform: general
  },

  // is it 'GameDate' or 'gameDate' ???
  scoreboard: {
    url: "http://stats.nba.com/stats/scoreboard",
    defaults: {
      "LeagueID": "00",
      "gameDate": "01/01/2000",
      "DayOffset": "0"
    },
    transform: general
  },

  playByPlay: {
    url: "http://stats.nba.com/stats/playbyplay",
    defaults: {
      "GameID": "0",
      "StartPeriod": "0",
      "EndPeriod": "0"
    },
    transform: general
  },

  boxScoreScoring: {
    url: "http://stats.nba.com/stats/boxscorescoring",
    defaults: boxScoreDefaults,
    transform: general
  },

  boxScoreUsage: {
    url: "http://stats.nba.com/stats/boxscoreusage",
    defaults: boxScoreDefaults,
    transform: general
  },

  boxScoreMisc: {
    url: "http://stats.nba.com/stats/boxscoremisc",
    defaults: boxScoreDefaults,
    transform: general
  },

  boxScoreAdvanced: {
    url: "http://stats.nba.com/stats/boxscoreadvanced",
    defaults: boxScoreDefaults,
    transform: general
  },

  boxScoreFourFactors: {
    url: "http://stats.nba.com/stats/boxscorefourfactors",
    defaults: boxScoreDefaults,
    transform: general
  },

  teamHistoricalLeaders: {
    url: "http://stats.nba.com/stats/teamhistoricalleaders",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "TeamID": "0"
    },
    transform: general
  },

  teamInfoCommon: {
    url: "http://stats.nba.com/stats/teaminfocommon",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "SeasonType": "Regular Season",
      "TeamID": "0"
    },
    transform: general
  },

  commonTeamRoster: {
    url: "http://stats.nba.com/stats/commonteamroster",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "TeamID": "0"
    },
    transform: general
  },

  teamPlayerDashboard: {
    url: "http://stats.nba.com/stats/teamplayerdashboard",
    defaults: {
      "MeasureType": "Base",
      "PerMode": "PerGame",
      "PlusMinus": "N",
      "PaceAdjust": "N",
      "Rank": "N",
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "TeamID": "0",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0"
    },
    transform: general
  },

  playerDashPtShotLog: {
    url: "http://stats.nba.com/stats/playerdashptshotlog",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "SeasonType": "Regular Season",
      "PlayerID": "0",
      "TeamID": "0",
      "MeasureType": "Base",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0"
    },
    transform: general
  },

  playerDashPtReboundLogs: {
    url: "http://stats.nba.com/stats/playerdashptreboundlogs",
    defaults: {
      "LeagueID": "00",
      "Season": DEFAULT_SEASON,
      "SeasonType": "Regular Season",
      "PlayerID": "0",
      "TeamID": "0",
      "Outcome": "",
      "Location": "",
      "Month": "0",
      "SeasonSegment": "",
      "DateFrom": "",
      "DateTo": "",
      "OpponentTeamID": "0",
      "VsConference": "",
      "VsDivision": "",
      "GameSegment": "",
      "Period": "0",
      "LastNGames": "0"
    },
    transform: general
  }

};