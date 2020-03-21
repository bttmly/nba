const nba = require("../../");

const delay = ms => new Promise(r => setTimeout(r, ms));

const callMethod = (name, params = {}) => () => {
  params.season = 201;
  return nba.synergy[name](params);
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
});
