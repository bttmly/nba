"use strict";

var request = require("request");
var vm = require("vm");

module.exports = vmStrategy;

// in a node environment, this will fetch and evaluate a JS script (in a vm context)
// this is how we get SportVu data
function vmStrategy (url, globalName, callback) {
  request(url, function (err, resp, body) {
    if (err) return callback(err);

    var sandbox = {};

    try {
      vm.runInNewContext(body, sandbox);
    } catch (e) {
      callback(e);
    }

    callback(null, sandbox[globalName]);
  });
};
