var expect = require("chai").expect;

var nba = require("../../src");

describe("searching methods", function () {

  describe("#playerIdFromName", function () {
    it("works for names", function () {
      expect(nba.playerIdFromName("lebron")).to.equal(2544);
    });

    it("is case insensitive", function () {
      expect(nba.playerIdFromName("LEBRON")).to.equal(2544);
    });
  });

  describe("#findPlayer", function () {
    it("searches name", function () {
      expect(nba.findPlayer("stephen curry")).to.deep.equal({
        firstName: 'Stephen',
        lastName: 'Curry',
        playerId: 201939,
        fullName: 'Stephen Curry',
        downcaseName: 'stephen curry'
      });
    });

  });

  describe("#searchPlayers", function () {
    it("finds many players", function () {
      var players = nba.searchPlayers("james")

      expect(Array.isArray(players)).to.equal(true);

      var ids = players.map(function (p) { return p.playerId });

      // james harden
      expect(ids.indexOf(201935)).to.not.equal(-1);

      // lebron james
      expect(ids.indexOf(2544)).to.not.equal(-1);
    });
  });

  describe("#teamIdFromName", function () {
    it("works for short name", function () {
      expect(nba.teamIdFromName("warriors")).to.equal(1610612744);
    });

    it("works for location", function () {
      expect(nba.teamIdFromName("golden state")).to.equal(1610612744);
    });

    it("works for full name", function () {
      expect(nba.teamIdFromName("golden state warriors")).to.equal(1610612744);
    })

    it("works for abbreviations", function () {
      expect(nba.teamIdFromName("gsw")).to.equal(1610612744);
    });

    it("is case insensitive", function () {
      expect(nba.teamIdFromName("WARRIORS")).to.equal(1610612744);
      expect(nba.teamIdFromName("GoLdEn StAtE")).to.equal(1610612744);
      expect(nba.teamIdFromName("GSW")).to.equal(1610612744);
    });
  });

});
