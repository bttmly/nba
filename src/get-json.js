const url = require("url");
const qs = require("querystring");
const template = require("nba-client-template");

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

function createGetJson () {
  const fetch = require("node-fetch");

  return function getJson (_url, query, _options = {}) {
    const urlStr = createUrlString(_url, query);

    const options = Object.assign({}, _options);
    options.headers = Object.assign((options.headers || {}), HEADERS);

    return fetch(urlStr, options)
      .then(resp => {
        if (resp.ok) return resp.json();

        return resp.text().then(function (text) {
          throw new Error(`${resp.status} ${resp.statusText} – ${text}`);
        });
      });
  };
}

function createGetJsonp () {
  const jsonp = require("jsonp");

  return function getJsonp (_url, query, options = {}) {
    return new Promise(function (resolve, reject) {
      const urlStr = createUrlString(_url, query);

      jsonp(urlStr, {timeout: options.timeout}, function (err, data) {
        // for compatibility with timeouts from request module
        if (err && err.message === "Timeout") err.code = "ETIMEDOUT";
        if (err) return reject(err);
        return resolve(data);
      });
    });
  };
}

module.exports = typeof window === "undefined" ?
  createGetJson() : createGetJsonp();
