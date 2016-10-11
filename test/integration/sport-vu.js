"use strict";

const nba = require("../../lib");
const fs = require("fs");
const path = require("path");
const pify = require("pify");

// for interactive inspection
global.SportVuData = {};

const verifyShape = shape => response => response;

const callMethod = (name, shape) => () =>
  nba.sportVu[name]().then(verifyShape(shape)).then(response => global.SportVuData[name] = response);

describe("sport vu methods", function () {
  it("#speed", callMethod("speed"));
  it("#touches", callMethod("touches"));
  it("#passing", callMethod("passing"));
  it("#defense", callMethod("defense"));
  it("#rebounding", callMethod("rebounding"));
  it("#drives", callMethod("drives"));
  it("#shooting", callMethod("shooting"));
  it("#catchShoot", callMethod("catchShoot"));
  it("#pullUpShoot", callMethod("pullUpShoot"));

  after(function () {
    return Promise.all(Object.keys(global.SportVuData).map(k =>
      pify(fs.writeFile)(
        path.join(__dirname, "../../responses", `sportvu-${k}.json`),
        JSON.stringify(global.SportVuData[k], null, 2)
      )
    ))
    .catch(console.error);
  });
});
