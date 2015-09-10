// NBA tips off in late October (9 in 0-index).
const NBA_START_MONTH = 9;
// TODO figure out what this really is.
const START_YEAR = 1900;
const END_YEAR = new Date().getFullYear();

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

module.exports = class Season {
  constructor (start) {
    this.start = validateYear(start);
    this.end = this.start + 1;
  }

  prev () {
    return new Season(this.start - 1);
  }

  next () {
    return new Season(this.end);
  }

  toString () {
    return this.start + "-" + String(end).slice(2);
  }

  toArray () {
    return [this.start, this.end];
  }
};
