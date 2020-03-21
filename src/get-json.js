const url = require("url");
const fetch = require("node-fetch");
const headers = require("./headers");

function createUrlString (_url, query) {
  const urlObj = url.parse(_url);
  urlObj.query = query;
  return urlObj.format();
}

module.exports = async function getJson (_url, query, _options = {}) {
  const urlStr = createUrlString(_url, query);
  const options = {
    ..._options,
    headers: { ...headers, ..._options.headers },
  };

  const resp = await fetch(urlStr, options);
  const contentType = resp.headers.get("content-type");
  if (!contentType.includes("application/json")) {
    throw new Error(`Got non-JSON response – content type: ${contentType}`);
  }

  if (resp.ok) return resp.json();

  const text = await resp.text();
  throw new Error(`${resp.status} ${resp.statusText} – ${text}`);
};


