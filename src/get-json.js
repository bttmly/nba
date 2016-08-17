const request = require("request");
const template = require("nba-client-template");

const HEADERS = {
  "user-agent": template.user_agent,
  referer: template.referrer,
};

function getJson (url, query, _options = {}) {
  return new Promise(function (resolve, reject) {

    // override where important, otherwise let caller configure
    const options = Object.assign({}, _options);
    options.url = url;
    options.qs = query;
    options.json = true;
    options.headers = Object.assign((options.headers || {}), HEADERS);

    // console.log("REQUEST OPTIONS", options);
    // console.log(url + "?" + qs.stringify(query));
    request(options, function (err, resp, body) {
      if (err == null && resp && resp.statusCode !== 200) {
        err = new Error(`HTTP error (${url}): ${resp.statusCode} ${body.Message || body}`);
      }

      if (resp == null) {
        err = new Error("No response.");
      }

      if (err) return reject(err);

      resolve(body);
    });
    
  });
}

module.exports = getJson;
