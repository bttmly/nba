const request = require("request");

const transportConfig = require("./transport-config");

function getJson (url, query, callback) {
  request({
    url: url,
    qs: query,
    json: true,
    timeout: transportConfig.timeout,
    pool: false,
  }, function (err, resp, body) {
    console.log(query, "GET JSON ERR:", err, typeof body);
    callback(err, body);
  });
};

module.exports = getJson;
