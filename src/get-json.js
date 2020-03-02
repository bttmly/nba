const url = require("url");
const template = require("nba-client-template");
const fetch = require("node-fetch");

const HEADERS = {
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "en-US",
  Accept: "*/*",
  "User-Agent": template.user_agent,
  Referer: template.referrer,
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  Origin: "http://stats.nba.com",
};

function createUrlString (_url, query) {
  const urlObj = url.parse(_url);
  urlObj.query = query;
  return urlObj.format();
}

module.exports = function getJson (_url, query, _options = {}) {
  const urlStr = createUrlString(_url, query);

  const options = {
    ..._options,
    headers: { ..._options.headers, ...HEADERS },
  };

  return fetch(urlStr, options)
    .then(resp => {
      if (resp.ok) return resp.json();

      return resp.text().then(function (text) {
        throw new Error(`${resp.status} ${resp.statusText} – ${text}`);
      });
    });
};


