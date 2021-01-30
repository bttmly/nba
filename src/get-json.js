const url = require("url");
const template = require("nba-client-template");
const axios = require("axios");

const HEADERS = {
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en,en-US;q=0.9",
  Accept: "application/json, text/plain, */*",
  "User-Agent": template.user_agent,
  Referer: "www.nba.com",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  Origin: "https://www.nba.com",
};

function createUrlString (_url, query) {
  const urlObj = url.parse(_url);
  urlObj.query = query;
  return urlObj.format();
}

async function getJsonAxios (_url, params, _options = {}) {
  const options = {
    ..._options,
    headers: { ...HEADERS, ..._options.headers  },
  };

  const urlStr = createUrlString(_url, params);
  try {
    const res = await axios.get(urlStr, options);
    return res.data;
  } catch (err) {
    const { response } = err;
    if (response) {
      throw new Error(`${response.status} ${response.data}`);
    }
    throw new Error(`Unknown HTTP error for ${url}`);
  }
};

module.exports = getJsonAxios;