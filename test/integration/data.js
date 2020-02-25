const nba = require("../../");

describe("nba data methods", function () {
  describe("#scoreboard", async () => {
    it("works with a direct date string", async () => {
      log(await nba.data.scoreboard("20181008"));
    });

    it("works with a date object", async () => {
      // pinned to the time I wrote this test
      log(await nba.data.scoreboard(new Date(1539056100872)));
    });
  });

  it("#boxScore", async () => {
    log(await nba.data.boxScore("20181009", "0011800055"));
  });

  it("#playByPlay", async () => {
    log(await nba.data.playByPlay("20181009", "0011800055"));
  });

  it("#schedule", async () => {
    log(await nba.data.schedule("2018"));
  });

  it("#teamSchedule", async () => {
    log(await nba.data.teamSchedule("2018", 1610612752));
  });

  it("#previewArticle", async () => {
    log(await nba.data.previewArticle("20190425", "0041800156"));
  });

  it("#recapArticle", async () => {
    log(await nba.data.recapArticle("20190425", "0041800156"));
  });

  it("#leadTracker", async () => {
    log(await nba.data.leadTracker("20190425", "0041800156", 1));
  });

  it("#playoffsBracket", async () => {
    log(await nba.data.playoffsBracket("2018"));
  });

  it("#teamLeaders", async () => {
    log(await nba.data.teamLeaders("2018", 1610612752));
  });

  it("#teamStatsRankings", async () => {
    log(await nba.data.teamStatsRankings("2018"));
  });

  it("#coaches", async () => {
    log(await nba.data.coaches("2018"));
  });

  it("#teams", async () => {
    log(await nba.data.teams());
  });

  it("#calendar", async () => {
    log(await nba.data.calendar());
  });

  it("#standings", async () => {
    log(await nba.data.standings());
  });
});

function log (...args) {
  if (!process.env.WITH_LOGS) return;
  console.log(...args);
}