const expect = require("expect");
const nba = require("../../lib");

describe("searching methods", () => {

  describe("#playerIdFromName", () => {
    it("works for names", () => {
      expect(nba.playerIdFromName("lebron")).toEqual(2544);
    });

    it("is case insensitive", () => {
      expect(nba.playerIdFromName("LEBRON")).toEqual(2544);
    });
  });

  describe("#findPlayer", () => {
    it("searches name", () => {
      expect(nba.findPlayer("stephen curry")).toEqual({
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
      expect(Array.isArray(players)).toEqual(true);
      const ids = players.map(p => p.playerId);

      // james harden
      expect(ids.indexOf(201935)).toNotEqual(-1);

      // lebron james
      expect(ids.indexOf(2544)).toNotEqual(-1);
    });
  });

  describe("#teamIdFromName", () => {
    it("works for short name", () => {
      expect(nba.teamIdFromName("warriors")).toEqual(1610612744);
    });

    it("works for location", () => {
      expect(nba.teamIdFromName("golden state")).toEqual(1610612744);
    });

    it("works for full name", () => {
      expect(nba.teamIdFromName("golden state warriors")).toEqual(1610612744);
    });

    it("works for abbreviations", () => {
      expect(nba.teamIdFromName("gsw")).toEqual(1610612744);
    });

    it("is case insensitive", () => {
      expect(nba.teamIdFromName("WARRIORS")).toEqual(1610612744);
      expect(nba.teamIdFromName("GoLdEn StAtE")).toEqual(1610612744);
      expect(nba.teamIdFromName("GSW")).toEqual(1610612744);
    });
  });

});
