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

  it("#schedule", async () => {
    await nba.data.schedule("2018");
  });

  it("#teamSchedule", async () => {
    await nba.data.teamSchedule("2018", 1610612752);
  });

  it("#previewArticle", async () => {
    await nba.data.previewArticle("20190425", "0041800156");
  });

  it("#recapArticle", async () => {
    await nba.data.recapArticle("20190425", "0041800156");
  });

  it("#leadTracker", async () => {
    await nba.data.leadTracker("20190425", "0041800156", 1);
  });

  it("#playoffsBracket", async () => {
    await nba.data.playoffsBracket("2018");
  });

  it("#teamLeaders", async () => {
    await nba.data.teamLeaders("2018", 1610612752);
  });

  it("#teamStatsRankings", async () => {
    await nba.data.teamStatsRankings("2018");
  });

  it("#coaches", async () => {
    await nba.data.coaches("2018");
  });   

});