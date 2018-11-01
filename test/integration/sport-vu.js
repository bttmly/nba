const nba = require("../../");
const fs = require("fs");
const path = require("path");
const pify = require("pify");
const expect = require("expect");

// for interactive inspection
global.SportVuData = {};

const getError = async (p) => {
  try {
    await p;
    throw new Error("Expected to reject but fulfilled");
  } catch (err) {
    return err;
  }
};

const callMethod = (name) => async () => {
  expect(nba.sportVu[name]).toBeInstanceOf(Function);
  const { message } = await getError(nba.sportVu[name]());
  expect(message).toBe("NBA.com has removed the sportVu endpoints.");
};

describe.only("sport vu methods", function () {
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
