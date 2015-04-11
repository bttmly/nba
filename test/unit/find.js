var expect = require("chai").expect;

var nba = require("../../")

describe("#playerIdFromName", function () {

});

describe("#findPlayer", function () {

});

describe("#searchPlayers", function () {
  it("searches name", function () {

    expect(nba.findPlayer("stephen curry")).to.deep.equal({ 
        firstName: 'Stephen',
        lastName: 'Curry',
        playerId: 201939,
        fullName: 'Stephen Curry' 
      });
  
  });
});

describe("#teamIdFromName", function () {
  it("works for name", function () {
    expect(nba.teamIdFromName("warriors")).to.equal(1610612744);
  });

  it("works for location", function () {
    expect(nba.teamIdFromName("golden state")).to.equal(1610612744);
  });

  it("is case insensitive", function () {
    expect(nba.teamIdFromName("WARRIORS")).to.equal(1610612744);
  })
});