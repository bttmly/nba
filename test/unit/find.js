const expect = require("must");

const nba = require("../../src").usePromises();

describe("searching methods", () => {

  describe("#playerIdFromName", () => {
    it("works for names", () => {
      expect(nba.playerIdFromName("lebron")).to.equal(2544);
    });

    it("is case insensitive", () => {
      expect(nba.playerIdFromName("LEBRON")).to.equal(2544);
    });
  });

  describe("#findPlayer", () => {
    it("searches name", () => {
      expect(nba.findPlayer("stephen curry")).to.eql({
        firstName: "Stephen",
        lastName: "Curry",
        playerId: 201939,
        teamId: 1610612744,
        fullName: "Stephen Curry",
        downcaseName: "stephen curry",
      });
    });

  });

  describe("#searchPlayers", () => {
    it("finds many players", () => {
      const players = nba.searchPlayers("james");
      expect(Array.isArray(players)).to.equal(true);
      const ids = players.map(p => p.playerId);

      // james harden
      expect(ids.indexOf(201935)).to.not.equal(-1);

      // lebron james
      expect(ids.indexOf(2544)).to.not.equal(-1);
    });
  });

  describe("#teamIdFromName", () => {
    it("works for short name", () => {
      expect(nba.teamIdFromName("warriors")).to.equal(1610612744);
    });

    it("works for location", () => {
      expect(nba.teamIdFromName("golden state")).to.equal(1610612744);
    });

    it("works for full name", () => {
      expect(nba.teamIdFromName("golden state warriors")).to.equal(1610612744);
    });

    it("works for abbreviations", () => {
      expect(nba.teamIdFromName("gsw")).to.equal(1610612744);
    });

    it("is case insensitive", () => {
      expect(nba.teamIdFromName("WARRIORS")).to.equal(1610612744);
      expect(nba.teamIdFromName("GoLdEn StAtE")).to.equal(1610612744);
      expect(nba.teamIdFromName("GSW")).to.equal(1610612744);
    });
  });

});
