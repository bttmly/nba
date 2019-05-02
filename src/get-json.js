const template = require("nba-client-template");
const axios = require("axios");

const BASE_HEADERS = {
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "en-US",
  Accept: "*/*",
  "User-Agent": template.user_agent,
  Referer: template.referrer,
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  Origin: "http://stats.nba.com",
};

const fetcher = axios.create({
  headers: BASE_HEADERS
})

function getJSON (url, params, { headers = {} } = {}) {
  return fetcher.get(url, { params, headers })
    .then(resp => resp.data)
}

module.exports = getJSON;
exports.BASE_HEADERS = BASE_HEADERS;