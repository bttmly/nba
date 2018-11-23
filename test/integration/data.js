const nba = require("../../");

describe("nba data methods", function () {
  describe("#scoreboard", async () => {
    it("works with a direct date string", async () => {
      await nba.data.scoreboard({ date: "20181008" });
    });
    
    it("works with a date object", async () => {
      // pinned to the time I wrote this test
      await nba.data.scoreboard({ date: new Date(1539056100872) });
    });
  });

  it("#boxScore", async () => {
    await nba.data.boxscore({ date: "20181009", gameId: "0011800055" });
  });

  it("#playByPlay", async () => {
    await nba.data.playByPlay({ date: "20181009", gameId: "0011800055" });
  });
});