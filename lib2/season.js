// NBA tips off in late October (9 in 0-index).
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NBA_START_MONTH = 9;
// TODO figure out what this really is.
var START_YEAR = 1900;
var END_YEAR = new Date().getFullYear();

function validateYear(year) {
  var num = Number(year);
  if (isNaN(num)) {
    throw new TypeError("Cannot convert " + year + "to number");
  }
  if (num < START_YEAR || num > END_YEAR) {
    throw new RangeError("Data unavailable for year " + num);
  }
  return num;
}

module.exports = (function () {
  function Season(start) {
    _classCallCheck(this, Season);

    this.start = validateYear(start);
    this.end = this.start + 1;
  }

  _createClass(Season, [{
    key: "prev",
    value: function prev() {
      return new Season(this.start - 1);
    }
  }, {
    key: "next",
    value: function next() {
      return new Season(this.end);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.start + "-" + String(end).slice(2);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.start, this.end];
    }
  }]);

  return Season;
})();