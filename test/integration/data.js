const nba = require("../../");
const expect = require("expect");
const { getError } = require("../util");

describe("nba data methods", function () {
  describe("#scoreboard", async () => {
    it("works with a direct date string", async () => {
      await nba.data.scoreboard("20181008");
    });

    it("works with a date object", async () => {
      // pinned to the time I wrote this test
      await nba.data.scoreboard(new Date(1539056100872));
    });

    it("fails without a date", async () => {
      const err = await getError(nba.data.scoreboard());
      expect(err.message).toEqual("Provide a Date object or a string in YYYYMMDD form");
    });
  });

  describe("#boxScore", () => {
    it("works", async () => {
      await nba.data.boxScore("20181009", "0011800055");
    });
  });

  describe("#playByPlay", () => {
    it("works", async () => {
      await nba.data.playByPlay("20181009", "0011800055");
    });
  });

});