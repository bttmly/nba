"use strict";


var DEFAULT_TIMEOUT = 60 * 1000;

// in browser environments, this function will fetch and evaluate a JS script
// this is how we get SportVu data
function getScriptTag (url, globalName, callback) {
  var target = document.getElementsByTagName("script")[0] || document.head;
  var prev = window[globalName];

  var script = document.createElement("script");
  script.src = url;
  script.onload = function () {
    var temp = window[globalName];
    cleanup();
    callback(null, temp);
  };

  script.onerror = function () {
    cleanup();
    callback(new Error(url));
  };

  target.parentNode.insertBefore(script, target);

  function cleanup () {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
    script = null;
    window[globalName] = prev;
  }
};
