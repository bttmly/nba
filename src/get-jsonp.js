const qs = require("querystring");
const jsonp = require("jsonp");

const transportConfig = require("./transport-config");

function getJsonp (url, query, callback) {
  url += `?${qs.stringify(query)}`;
  jsonp(url, {timeout: transportConfig.timeout}, (err, result) => {
    // for compatibility with timeouts from request module
    if (err && err.message === "Timeout") err.code = "ETIMEDOUT";
    callback(err, result);
  });
}

module.exports = getJsonp;
