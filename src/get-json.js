require("isomorphic-fetch");
const qs = require("querystring");
const url = require("url");
const template = require("nba-client-template");

const HEADERS = {
  "user-agent": template.user_agent,
  referer: template.referrer,
};

function getJson (_url, query, _options = {}) {

  const urlObj = url.parse(_url);
  urlObj.query = query;
  const urlStr = urlObj.format();

  const options = Object.assign({}, _options);
  options.headers = Object.assign((options.headers || {}), HEADERS);

  return fetch(urlStr, options)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      }
      return resp.json();
    });
}

module.exports = getJson;
