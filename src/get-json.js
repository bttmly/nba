const request = require("request");

const transportConfig = require("./transport-config");

function getJson (url, query, callback) {
  request({
    url: url,
    qs: query,
    json: true,
    agent: false,
    timeout: transportConfig.timeout,
    // from https://github.com/seemethere/nba_py/blob/79b764ec86a4740b0460ab8c75483f41247e940f/nba_py/__init__.py#L14
    headers: {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
      "referer": "http://stats.nba.com/scores/",
    },
  }, function (err, resp, body) {
    if (err == null && resp != null && resp.statusCode !== 200) {
      err = new Error("HTTP error: " + resp.statusCode + " " + JSON.stringify(resp.body));
    }

    if (resp == null) {
      err = new Error("No response.");
    }

    callback(err, body);
  });
};

module.exports = getJson;
