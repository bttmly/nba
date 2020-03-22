const nba = require("../../");
const ResponseRecorder = require("../recorder");
const recorder = new ResponseRecorder("synergy");

const delay = ms => new Promise(r => setTimeout(r, ms));


const callMethod = (name, params = {}) => async () => {
  params.season = 201;
  const result = await nba.synergy[name](params);
  recorder.record(name, result);
  return result;
};

describe("nba synergy API", function () {
  const categories = [
    "Transition",
    "PRBallHandler",
    "PRRollman",
    "Postup",
    "Spotup",
    "Handoff",
    "Cut",
    "OffScreen",
    "OffRebound",
    "Misc",
  ];

  // it seems like we get throttled or blacklisted if we send these requests too quickly
  afterEach(async () => {
    console.log("delay 3s");
    await delay(3000);
  });

  categories.forEach(function (c) {
    it(`category ${c}`, callMethod("playerPlayType", {category: c}));
  });

  after(() => {
    console.log("WRITE");
    recorder.write();
  });
});
