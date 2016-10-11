const qs = require("querystring");
const jsonp = require("jsonp");

function getJsonp (url, query, options = {}) {
  return new Promise(function (resolve, reject) {
    url += `?${qs.stringify(query)}`;
    jsonp(url, {timeout: options.timeout}, function (err, data) {
      // for compatibility with timeouts from request module
      if (err && err.message === "Timeout") err.code = "ETIMEDOUT";
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

module.exports = getJsonp;
