const nba = require("../../src").usePromises();

// for interactive inspection
global.SportVuData = {};

let verifyShape = shape => response => response;

let callMethod = (name, shape) => () => 
  nba.sportVu[name]().then(verifyShape(shape)).then(response => global.SportVuData[name] = response);

describe("sport vu methods", function () {

  before(() => nba.sportVu.setTransport(require("../../src/get-json")));

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
