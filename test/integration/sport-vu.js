const nba = require("../../");
const expect = require("expect");
const { getError } = require("../util");

// for interactive inspection
global.SportVuData = {};

const callMethod = (name) => async () => {
  expect(nba.sportVu[name]).toBeInstanceOf(Function);
  const { message } = await getError(nba.sportVu[name]());
  expect(message).toBe("NBA.com has removed the sportVu endpoints.");
};

describe("sport vu methods", () => {
  it("#speed", callMethod("speed"));
  it("#touches", callMethod("touches"));
  it("#passing", callMethod("passing"));
  it("#defense", callMethod("defense"));
  it("#rebounding", callMethod("rebounding"));
  it("#drives", callMethod("drives"));
  it("#shooting", callMethod("shooting"));
  it("#catchShoot", callMethod("catchShoot"));
  it("#pullUpShoot", callMethod("pullUpShoot"));
});
