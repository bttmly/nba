"use strict";
var assign = require("object-assign");

module.exports = function scriptTagStrategy (url, globalName, callback) {
  var script, prev, temp;

  function cleanup () {
    document.body.removeChild(script);
    script = null;
    window[globalName] = prev;
  }

  prev = window[globalName];
  script = document.createElement("script");

  assign(script, {
    src: url,
    onload: function () {
      temp = window[globalName];
      cleanup();
      callback(null, temp);
    },
    onerror: function () {
      cleanup();
      callback(new Error(url));
    }
  });

  document.body.appendChild(script);
};