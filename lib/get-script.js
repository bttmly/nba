"use strict";

var request = require("request");
var vm = require("vm");

module.exports = function vmStrategy (url, globalName, callback) {
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
