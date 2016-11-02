var sinon = require("sinon");

var optionPosition = 1;
var urlPosition = 0;

module.exports = function (...args) {
  var spy = sinon.spy(...args);
  spy.lastCalledWithOption = function (option, value) {
    var opts = spy.lastCall.args[optionPosition];
    if (opts[option] == null) {
      return false;
    }
    if (value) {
      return opts[option] === value;
    }
    return true;
  };
  spy.lastCalledWithUrl = function (url) {
    return spy.lastCall.args[urlPosition] === url;
  };
  return spy;
};
