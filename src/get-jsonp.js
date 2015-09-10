const qs = require("querystring");
const jsonp = require("jsonp");

const transportConfig = require("./transport-config");

function getJsonp (url, query, callback) {
  url += `?${qs.stringify(query)}`;
  jsonp(url, {timeout: transportConfig.timeout}, (err, result) => {
    if (err) {
      // for compatibility with timeouts from request module
      if (err.message === "Timeout") err.code = "ETIMEDOUT";
      callback(err);
    }
    callback(null, result);
  })
}

module.exports = getJsonp;
