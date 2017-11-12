const currentYear = new Date().getFullYear()
const nextYear = (new Date().getFullYear() + 1).toString().slice(2)
const currentSeason = `${currentYear}-${nextYear}`

const defaults = { season: currentSeason, LeagueID: "00", SeasonType: "Regular Season"};

module.exports = [
  {
    name: "league_standings",
    url: `http://stats.nba.com/stats/leaguestandings`,
    parameters: [
      "LeagueID",
      "Season", 
      "SeasonType"
    ],
    defaults: defaults
  }
]