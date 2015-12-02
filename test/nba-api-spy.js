var sinon = require("sinon");

var optionPosition = 1;
var urlPosition = 0;

module.exports = function () {
  var spy = sinon.spy.apply(this, arguments);
  spy.lastCalledWithOption = function (option, value) {
    var opts = this.lastCall.args[optionPosition];
    if (opts[option] == null) {
      return false
    }
    if (value) {
      return opts[option] === value;
    }
    return true;
  };
  spy.lastCalledWithUrl = function (url) {
    return this.lastCall.args[urlPosition] === url;
  };
  return spy;
};
