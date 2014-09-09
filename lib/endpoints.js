var DEFAULT_SEASON = "2013-14";

function boxScoreDefaults () {
  return {"GameID":"0","RangeType":"0","StartPeriod":"0","EndPeriod":"0","StartRange":"0","EndRange":"0"};
}

var endpoints = {
  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Regular Season","LeagueID":"00","PlayerID":"0","GraphStartSeason":"2009-10","GraphEndSeason":"2014-15","GraphStat":"PTS"}; }
  },
  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: function () { return {"PlayerID":"0","SeasonType":"Regular Season","LeagueID":"00","asynchFlag":"true"}; }
  },
  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: function () { return {"LeagueID":"00","Season":DEFAULT_SEASON,"IsOnlyCurrentSeason":"0"}; }
  },
  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Regular Season","LeagueID":"00","TeamID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":""}; }
  },
  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: function () { return {"Season":DEFAULT_SEASON,"SeasonType":"Playoffs","LeagueID":"00","PlayerID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0"}; }
  },
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: function () { return {"Season":DEFAULT_SEASON,"AllStarSeason":"","SeasonType":"Regular Season","LeagueID":"00","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":"","PlayerExperience":"","PlayerPosition":"","StarterBench":""}; }
  },
  scoreboard: {
    url: "http://stats.nba.com/stats/scoreboard/",
    defaults: function () { return {"LeagueID":"00","gameDate":"01/01/2000","DayOffset":"0"}; }
  },
  playByPlay: {
    url: "http://stats.nba.com/stats/playbyplay",
    defaults: function () { return {"GameID":"0021300721","StartPeriod":"0","EndPeriod":"0"}; }
  },
  boxScoreScoring: {
    url: "http://stats.nba.com/stats/boxscorescoring",
    defaults: boxScoreDefaults
  },
  boxScoreUsage: {
    url: "http://stats.nba.com/stats/boxscoreusage",
    defaults: boxScoreDefaults
  },
  boxScoreMisc: {
    url: "http://stats.nba.com/stats/boxscoremisc",
    defaults: boxScoreDefaults
  },
  boxScoreAdvanced: {
    url: "http://stats.nba.com/stats/boxscoreadvanced",
    defaults: boxScoreDefaults
  },
  boxScoreFourFactors: {
    url: "http://stats.nba.com/stats/boxscorefourfactors",
    defaults: boxScoreDefaults
  }
};

module.exports = endpoints;
