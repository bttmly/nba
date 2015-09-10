const request = require("request");

const transportConfig = require("./transport-config");

function getJson (url, query, callback) {
  request({
    url: url,
    qs: query,
    json: true,
    timeout: transportConfig.timeout,
  }, function (err, resp, body) {
    callback(err, body);
  });
};

module.exports = getJson;
