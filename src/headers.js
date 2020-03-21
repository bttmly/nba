const template = require("nba-client-template");

module.exports = {
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "en-US",
  Accept: "*/*",
  "User-Agent": template.user_agent,
  Referer: template.referrer,
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  Origin: "http://stats.nba.com",
};