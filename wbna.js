const nba = require("nba");
const getJSON = require("nba/src/get-json");

const transport = (url, params, options) => {
  const fixedURL = url.replace("stats.nba.com", "stats.wnba.com");
  return getJSON(fixedURL, params, options);
};

const wnbaStats = nba.stats.withTransport(transport);

(async () => {
  const result = await wnbaStats.playerInfo({ PlayerID: "1628886" });
  console.log(result);
})();