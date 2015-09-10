"use strict";

module.exports = function collectify(headers, rows) {
  return rows.map(function (row) {
    return row.reduce(function (cell, val, i) {
      cell[headers[i]] = val;
      return cell;
    }, {});
  });
};