const { getJsonNodeFetch, getJsonAxios } = require("../src/get-json");

async function main () {
  const url = "https://stats.nba.com/stats/leagueLeaders";
  const query = {
    "ActiveFlag": "No",
    "LeagueID": "00",
    "PerMode": "Totals",
    "Scope": "S",
    "Season": "All Time",
    "SeasonType": "Regular Season",
    "StatCategory": "PTS",
  };
  let err, result;

  ({ err, result } = await settle(getJsonNodeFetch(url, query)));
  console.log({ err, result });
  ({ err, result } = await settle(getJsonAxios(url, query)));
  console.log({ err, result });
}

async function settle (p) {
  try {
    const result = await p;
    return { result };
  } catch (err) {
    return { err };
  }
}

main();