"use strict";
var assign = require("object-assign");

module.exports = scriptTagStrategy;

// in browser environments, this function will fetch and evaluate a JS script
// this is how we get SportVu data
function scriptTagStrategy (url, globalName, callback) {

  var prev = window[globalName];
  var script = document.createElement("script");
  var temp;

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

  function cleanup () {
    document.body.removeChild(script);
    script = null;
    window[globalName] = prev;
  }
};
