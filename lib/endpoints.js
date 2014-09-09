var endpoints = {
  playerProfile: {
    url: "http://stats.nba.com/stats/playerprofile",
    defaults: function () { return {"Season":"2013-14","SeasonType":"Regular Season","LeagueID":"00","PlayerID":"0","GraphStartSeason":"2009-10","GraphEndSeason":"2014-15","GraphStat":"PTS"}; }
  },
  playerInfo: {
    url: "http://stats.nba.com/stats/commonplayerinfo",
    defaults: function () { return {"PlayerID":"0","SeasonType":"Regular Season","LeagueID":"00","asynchFlag":"true"}; }
  },
  playersInfo: {
    url: "http://stats.nba.com/stats/commonallplayers",
    defaults: function () { return {"LeagueID":"00","Season":"2013-14","IsOnlyCurrentSeason":"0"}; }
  },
  teamSplits: {
    url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits",
    defaults: function () { return {"Season":"2013-14","SeasonType":"Regular Season","LeagueID":"00","TeamID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":""}; }
  },
  playerSplits: {
    url: "http://stats.nba.com/stats/playerdashboardbygeneralsplits",
    defaults: function () { return { "Season":"2013-14","SeasonType":"Playoffs","LeagueID":"00","PlayerID":"0","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0"}; }
  },
  shots: {
    url: "http://stats.nba.com/stats/shotchartdetail",
    defaults: function () { return {"Season":"2013-14","AllStarSeason":"","SeasonType":"Regular Season","LeagueID":"00","MeasureType":"Base","PerMode":"PerGame","PlusMinus":"N","PaceAdjust":"N","Rank":"N","Outcome":"","Location":"","Month":"0","SeasonSegment":"","DateFrom":"","DateTo":"","OpponentTeamID":"0","VsConference":"","VsDivision":"","GameSegment":"","Period":"0","LastNGames":"0","GameScope":"","PlayerExperience":"","PlayerPosition":"","StarterBench":""}; }
  }
};

module.exports = endpoints;

/*
http://stats.nba.com/stats/playerdashboardbygeneralsplits?Season=2013-14&SeasonType=Playoffs&LeagueID=00&PlayerID=201142&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0
*/

/*
http://stats.nba.com/stats/commonplayerinfo/?PlayerID=201142&SeasonType=Regular+Season&LeagueID=00&asynchFlag=true
 */

/*
http://stats.nba.com/stats/commonallplayers/?LeagueID=00&Season=2013-14&IsOnlyCurrentSeason=0&callback=playerinfocallback
 */

/*
http://stats.nba.com/stats/commonteamyears?LeagueID=00&callback=teaminfocallback
 */

/*
http://stats.nba.com/stats/teamdashboardbygeneralsplits?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&TeamID=1610612748&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=
 */

/*
http://stats.nba.com/stats/playerprofile?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&PlayerID=201939&GraphStartSeason=2009-10&GraphEndSeason=2014-15&GraphStat=PTS
 */


