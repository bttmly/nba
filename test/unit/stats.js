"use strict";

process.env.NODE_ENV = "testing";

const expect = require("expect");
const noop = () => {};

// a copy of stats we can safely iterate (w/o rewire methods);
// const stats = require("../../src/stats");

let stats = require("../../lib").stats;

let lastSettings;
let lastUrl;

function jsonStub (url, settings) {
  lastUrl = url;
  lastSettings = settings;
  return new Promise(function (resolve) {
    setTimeout(resolve, 1);
  });
}

function lastCalledWithOption (prop, val) {
  return lastSettings[prop] === val;
}

function lastUrlEq (url) {
  return lastUrl === url;
}

// these tests don't go over the internet, they merely check that the method called has the correct URL, and show that translation from js-style camel cased
// properties into NBA styled properties works
describe("stats methods", function () {
  
  before(() => stats = stats.withTransport(jsonStub));

  describe("#playerProfile()", () => {
    it("should issue a request to the correct URL", () => stats.playerProfile({playerId: 1234}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/playerprofile")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.playerProfile({playerId: 1234}).then(() => expect(lastCalledWithOption("PlayerID", 1234)).toEqual(true)));
  });

  describe("#playerInfo()", () => {
    it("should issue a request to the correct URL", () => stats.playerInfo({playerId: 1}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/commonplayerinfo")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.playerInfo({playerId: 1}).then(() => expect(lastCalledWithOption("PlayerID", 1)).toEqual(true)));
  });

  describe("#playerSplits()", () => {
    it("should issue a request to the correct URL", () => stats.playerSplits({playerId: 2}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/playerdashboardbygeneralsplits")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.playerSplits({playerId: 2}).then(() => expect(lastCalledWithOption("PlayerID", 2)).toEqual(true)));
  });

  describe("#playersInfo()", () => {
    it("should issue a request to the correct URL", () => stats.playersInfo({season: "2013-14"}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/commonallplayers")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.playersInfo({season: "2013-14"}).then(() => expect(lastCalledWithOption("Season", "2013-14")).toEqual(true)));
  });

  describe("#teamStats()", () => {
    it("should issue a request to the correct URL", () => stats.teamStats({season: "2012-13"}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/leaguedashteamstats")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamStats({season: "2012-13"}).then(() => expect(lastCalledWithOption("Season", "2012-13")).toEqual(true)));
  });

  describe("#teamSplits()", () => {
    it("should issue a request to the correct URL", () => stats.teamSplits({season: "2011-12"}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/teamdashboardbygeneralsplits")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamSplits({season: "2011-12"}).then(() => expect(lastCalledWithOption("Season", "2011-12")).toEqual(true)));
  });

  describe("#teamYears()", () => {
    it("should issue a request to the correct URL", () => stats.teamYears({leagueId: "00"}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/commonteamyears")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamYears({leagueId: "00"}).then(() => expect(lastCalledWithOption("LeagueID", "00")).toEqual(true)));
  });

  describe("#shots()", () => {
    it("should issue a request to the correct URL", () => stats.shots({playerId: 3}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/shotchartdetail")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.shots({playerId: 3}).then(() => expect(lastCalledWithOption("PlayerID", 3)).toEqual(true)));
  });

  describe("#scoreboard()", () => {
    it("should issue a request to the correct URL", () => stats.scoreboard({gameDate: "12/25/2014"}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/scoreboard")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.scoreboard({gameDate: "12/25/2014"}).then(() => expect(lastCalledWithOption("gameDate", "12/25/2014")).toEqual(true)));
  });

  describe("#playByPlay()", () => {
    it("should issue a request to the correct URL", () => stats.playByPlay({gameId: 1}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/playbyplay")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.playByPlay({gameId: 1}).then(() => expect(lastCalledWithOption("GameID", 1)).toEqual(true)));
  });

  describe("#teamHistoricalLeaders()", () => {
    it("should issue a request to the correct URL", () => stats.teamHistoricalLeaders({teamId: 7}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/teamhistoricalleaders")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamHistoricalLeaders({teamId: 7}).then(() => expect(lastCalledWithOption("TeamID", 7)).toEqual(true)));
  });

  describe("#teamInfoCommon()", () => {
    it("should issue a request to the correct URL", () => stats.teamInfoCommon({teamId: 8}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/teaminfocommon")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamInfoCommon({teamId: 8}).then(() => expect(lastCalledWithOption("TeamID", 8)).toEqual(true)));
  });

  describe("#commonTeamRoster()", () => {
    it("should issue a request to the correct URL", () => stats.commonTeamRoster({teamId: 9}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/commonteamroster")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.commonTeamRoster({teamId: 9}).then(() => expect(lastCalledWithOption("TeamID", 9)).toEqual(true)));
  });

  describe("#teamPlayerDashboard()", () => {
    it("should issue a request to the correct URL", () => stats.teamPlayerDashboard({teamId: 10}).then(() => expect(lastUrlEq("http://stats.nba.com/stats/teamplayerdashboard")).toEqual(true)));
    it("should issue a request with the correct params", () => stats.teamPlayerDashboard({teamId: 10}).then(() => expect(lastCalledWithOption("TeamID", 10)).toEqual(true)));
  });

});

// describe("all endpoints", () => {
//   Object.keys(stats).forEach(key => it("should THROW an error when passed a bad parameter", () => expect(() => stats[key]({badParam: "xyz"}, noop)).to.throw())))
// });
