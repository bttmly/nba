const url = require("url");
const qs = require("querystring");

const getQs = uri => uri.search[0] === "?" ? uri.search.slice(1) : uri.search;

module.exports = function stringToEndpoint (str) {
  const uri = url.parse(str);
  const params = qs.parse(getQs(uri));

  console.log("uri", uri.hostname + uri.pathname);
  console.log("params", params);
};


