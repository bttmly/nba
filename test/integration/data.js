const nba = require("../../");

describe("nba data methods", function () {
  it("#scoreboard", async () => {
    await nba.data.scoreboard("20181008");
  });
});