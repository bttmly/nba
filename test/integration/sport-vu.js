const expect = require("expect");
const nba = require("../../");

const getRejection = async p => {
  try {
    await p;
  } catch (err) {
    return err;
  }
  throw new Error("Expected promise to reject but it fulfilled");
};

const callMethod = (name) => async () => {
  const err = await getRejection(nba.sportVu[name]());
  expect(err.message).toBe("NBA.com has removed the sportVu endpoints.");
};

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
});
