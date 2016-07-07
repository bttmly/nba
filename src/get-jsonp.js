const qs = require("querystring");
const jsonp = require("jsonp");

const transportConfig = require("./transport-config");

function getJsonp (url, query) {
  return new Promise(function (resolve, reject) {
    url += `?${qs.stringify(query)}`;
    jsonp(url, {timeout: transportConfig.timeout}, (err, result) => {
      // for compatibility with timeouts from request module
      if (err && err.message === "Timeout") err.code = "ETIMEDOUT";

      if (err) return reject(err);

      return resolve(result);
    });
  });
}

module.exports = getJsonp;
