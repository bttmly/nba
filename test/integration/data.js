const nba = require("../../");

describe("nba data methods", function () {
  describe("#scoreboard", async () => {
    it("works with a direct date string", async () => {
      await nba.data.scoreboard("20181008");
    });
    
    it("works with a date object", async () => {
      // pinned to the time I wrote this test
      await nba.data.scoreboard(new Date(1539056100872));
    });
  });

  it("#boxScore", async () => {
    await nba.data.boxScore("20181009", "0011800055");
  });

  it("#playByPlay", async () => {
    await nba.data.playByPlay("20181009", "0011800055");
  });
});