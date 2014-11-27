"use strict";

var qs = require("query-string");

var RequestError = require("./errors").RequestError;

var PREFIX = "__jsonp__";

module.exports = function jsonpStrategy (url, query, callback) {
  var fnName, script;

  function cleanup () {
    document.body.removeChild(script);
    script = null;
    delete window[fnName];
  }

  if (query == null) {
    query = {};
  }

  fnName = PREFIX + Math.random().toString(36).slice(2);
  script = document.createElement("script");

  script.onerror = function () {
    cleanup();
    callback(new RequestError(url, query));
  };

  window[fnName] = function (data) {
    cleanup();
    callback(null, data);
  };

  query.callback = fnName;
  script.src = url + (query ? "?" + qs.stringify(query) : "");
  document.body.appendChild(script);
};

