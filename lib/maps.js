"use strict";

// All maps are actually map-returning functions. We need to absolutely
// prevent modules requiring these maps from altering them.
//
// Options:
//  - Return a "frozen" version (Object.freeze)
//  - Return a copy
//  - Return a new object
//
//  Frozen objects are sub-optimal, primarily since they don't
//  always throw errors. Also, when "extending" them you need
//  to pass in a new object first. Not a problem with copies.

// TODO: DRY up params
// TODO: Settle on how to pass out these objects

function nbaParams () {
  return {
    "Season": 1,
    "AllStarSeason": 1,
    "SeasonType": 1,
    "LeagueID": 1,
    "MeasureType": 1,
    "PerMode": 1,
    "PlusMinus": 1,
    "PaceAdjust": 1,
    "Rank": 1,
    "Outcome": 1,
    "Location": 1,
    "Month": 1,
    "SeasonSegment": 1,
    "DateFrom": 1,
    "DateTo": 1,
    "OpponentTeamID": 1,
    "VsConference": 1,
    "VsDivision": 1,
    "GameSegment": 1,
    "Period": 1,
    "LastNGames": 1,
    "GameScope": 1,
    "PlayerExperience": 1,
    "PlayerPosition": 1,
    "StarterBench": 1,
    "TeamID": 1,
    "GameID": 1,
    "Position": 1,
    "RookieYear": 1,
    "ContextFilter": 1,
    "ContextMeasure": 1,
    "zone-mode": 1,
    "GroupQuantity": 1,
    "pageNo": 1,
    "rowsPerPage": 1
  };
}

function jsParams () {
  return {
    "season": 1,
    "allStarSeason": 1,
    "seasonType": 1,
    "leagueId": 1,
    "measureType": 1,
    "perMode": 1,
    "plusMinus": 1,
    "paceAdjust": 1,
    "rank": 1,
    "outcome": 1,
    "location": 1,
    "month": 1,
    "seasonSegment": 1,
    "dateFrom": 1,
    "dateTo": 1,
    "opponentTeamId": 1,
    "vsConference": 1,
    "vsDivision": 1,
    "gameSegment": 1,
    "period": 1 ,
    "lastNGames": 1,
    "gameScope": 1,
    "playerExperience": 1,
    "playerPosition": 1,
    "starterBench": 1,
    "teamId": 1,
    "gameId": 1,
    "position": 1,
    "rookieYear": 1,
    "contextFilter": 1,
    "contextMeasure": 1,
    "zoneMode": 1,
    "groupQuantity": 1,
    "pageNo": 1,
    "rowsPerPage": 1
  };
}

function twoWayMap () {
  return {
    "Season": "season",
    "season": "Season",
    "AllStarSeason": "allStarSeason",
    "allStarSeason": "AllStarSeason",
    "SeasonType": "seasonType",
    "seasonType": "SeasonType",
    "LeagueID": "leagueId",
    "leagueId": "LeagueID",
    "MeasureType": "measureType",
    "measureType": "MeasureType",
    "PerMode": "perMode",
    "perMode": "PerMode",
    "PlusMinus": "plusMinus",
    "plusMinus": "PlusMinus",
    "PaceAdjust": "paceAdjust",
    "paceAdjust": "PaceAdjust",
    "Rank": "rank",
    "rank": "Rank",
    "Outcome": "outcome",
    "outcome": "Outcome",
    "Location": "location",
    "location": "Location",
    "Month": "month",
    "month": "Month",
    "SeasonSegment": "seasonSegment",
    "seasonSegment": "SeasonSegment",
    "DateFrom": "dateFrom",
    "dateFrom": "DateFrom",
    "DateTo": "dateTo",
    "dateTo": "DateTo",
    "OpponentTeamID": "opponentTeamId",
    "opponentTeamId": "OpponentTeamID",
    "VsConference": "vsConference",
    "vsConference": "VsConference",
    "VsDivision": "vsDivision",
    "vsDivision": "VsDivision",
    "GameSegment": "gameSegment",
    "gameSegment": "GameSegment",
    "Period": "period",
    "period": "Period",
    "LastNGames": "lastNGames",
    "lastNGames": "LastNGames",
    "GameScope": "gameScope",
    "gameScope": "GameScope",
    "PlayerExperience": "playerExperience",
    "playerExperience": "PlayerExperience",
    "PlayerPosition": "playerPosition",
    "playerPosition": "PlayerPosition",
    "StarterBench": "starterBench",
    "starterBench": "StarterBench",
    "TeamID": "teamId",
    "teamId": "TeamID",
    "GameID": "gameId",
    "gameId": "GameID",
    "PlayerID": "playerId",
    "playerId": "PlayerID",
    "Position": "position",
    "position": "Position",
    "RookieYear": "rookieYear",
    "rookieYear": "RookieYear",
    "ContextFilter": "contextFilter",
    "contextFilter": "ContextFilter",
    "ContextMeasure": "contextMeasure",
    "contextMeasure": "ContextMeasure",
    "zone-mode": "zoneMode",
    "zoneMode": "zone-mode",
    "GroupQuantity": "groupQuantity",
    "groupQuantity": "GroupQuantity",
    "pageNo": "pageNo",
    "rowsPerPage": "rowsPerPage",
    "StartPeriod": "startPeriod",
    "startPeriod": "StartPeriod",
    "EndPeriod": "endPeriod",
    "endPeriod": "EndPeriod",
    "DayOffset": "dayOffset",
    "dayOffset": "DayOffset",
    "gameDate": "GameDate",
    "GameDate": "gameDate"
  };
}

module.exports = {
  nbaParams: nbaParams,
  jsParams: jsParams,
  twoWayMap: twoWayMap
};

// alternate method w/o freeze & such
// assuming a "maps" object with all the maps in it...
// var maps = {};
// module.exports = Object.keys( maps ).reduce( function ( result, key ) {
//   result[key] = function () {
//     return extend( {}, maps[key] );
//   };
//   return result;
// }, {} );
