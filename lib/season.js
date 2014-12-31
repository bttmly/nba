"use strict";

var demethodize = require("demethodize");

// NBA tips off in late October (9 in 0-index).
var NBA_START_MONTH = 9;
// TODO figure out what this really is.
var START_YEAR = 1900;
var END_YEAR = new Date().getFullYear();

var strSlice = demethodize("".slice);

// throws if year can't be coerced to a number
// or if the coerced number is out of range
function validateYear (year) {
  var num = Number(year);
  if (isNaN(num)) {
    throw new TypeError("Cannot convert " + year + "to number");
  }
  if (num < START_YEAR || num > END_YEAR) {
    throw new RangeError("Data unavailable for year " + num);
  }
  return num;
}

function Season (startYear) {
  var start = validateYear(startYear);
  var end = start + 1;
  var instance = {
    prev: function () {
      return Season(start - 1);
    },
    next: function () {
      return Season(end);
    },
    toString: function () {
      return start + "-" + strSlice(end, 2);
    },
    toArray: function () {
      return [start, end];
    }
  };
  return instance;
}

Season.current = function () {
  var now = new Date();
  var year = now.getMonth() >= NBA_START_MONTH ?
    now.getFullYear() :
    now.getFullYear() - 1;
  return Season(year);
};

module.exports = Season;
