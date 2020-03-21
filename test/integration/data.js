const nba = require("../../");
const fs = require("fs");
const path = require("path");
const expect = require("expect");

const responses = {};

describe("nba data methods", function () {
  after(() => {
    if (process.env.WRITE_RESPONSES) {
      console.log("writing responses to disk");
      for (const [method, result] of Object.entries(responses)) {
        const fileName = `data_${method}.json`;
        const content = JSON.stringify([result], null, 2);
        fs.writeFileSync(path.join(__dirname, "../responses", fileName), content);
      }
    }
  });


  describe("#scoreboard", async () => {
    it("works with a direct date string", async () => {
      return callMethod("scoreboard", "20181008");
    });

    it("works with a date object", async () => {
      // pinned to the time I wrote this test
      return callMethod("scoreboard", new Date(1539056100872));
    });

    it("accepts a number", async () => {
      const withStr = await nba.data.scoreboard("20181008");
      const withNum = await nba.data.scoreboard(20181008);
      expect(withStr).toEqual(withNum);
    });
  });

  it("#boxScore", async () => {
    return callMethod("boxScore", "20181009", "0011800055");
  });

  it("#playByPlay", async () => {
    return callMethod("playByPlay", "20181009", "0011800055");
  });

  it("#schedule", async () => {
    return callMethod("schedule", "2018");
  });

  it("#teamSchedule", async () => {
    return callMethod("teamSchedule", "2018", 1610612752);
  });

  it("#previewArticle", async () => {
    return callMethod("previewArticle", "20190425", "0041800156");
  });

  it("#recapArticle", async () => {
    return callMethod("recapArticle", "20190425", "0041800156");
  });

  it("#leadTracker", async () => {
    return callMethod("leadTracker", "20190425", "0041800156", 1);
  });

  it("#playoffsBracket", async () => {
    return callMethod("playoffsBracket", "2018");
  });

  it("#teamLeaders", async () => {
    return callMethod("teamLeaders", "2018", 1610612752);
  });

  it("#teamStatsRankings", async () => {
    return callMethod("teamStatsRankings", "2018");
  });

  it("#coaches", async () => {
    return callMethod("coaches", "2018");
  });

  it("#teams", async () => {
    return callMethod("teams");
  });

  it("#calendar", async () => {
    return callMethod("calendar");
  });

  it("#standings", async () => {
    return callMethod("standings");
  });
});

const callMethod = async (name, ...args) => {
  const r = await nba.data[name](...args);
  delete r._internal;
  responses[name] = r;
  if (process.env.WITH_LOGS) console.log(r);
  return r;
};