"use strict";

// NBA tips off in late October (9 in 0-index).
var NBA_START_MONTH = 9;

function Season ( startYear ) {
  this._start = Number( startYear );
  this._end = this._start + 1;
}

Season.prototype.prev = function () {
  return new Season( this._start - 1 );
};

Season.prototype.next = function () {
  return new Season( this._end );
};

Season.prototype.toString = function () {
  return this._start + "-" + String( this._end ).slice( 2 );
};

Season.prototype.toArray = function () {
  return [ this._start, this._end ];
};

Season.current = function () {
  var now = new Date();
  var year = now.getMonth() >= NBA_START_MONTH ?
    now.getFullYear() :
    now.getFullYear() - 1;
  return new Season( year );
};

module.exports = Season;
