const translateKeys = require("./util/translate-keys");
const blank = require("./util/blank");
const invert = require("lodash.invert");

const nbaToJsMap = blank({
  "Season": "season",
  "SeasonType": "seasonType",
  "LeagueID": "leagueId",
  "PlayerID": "playerId",
  "GraphStartSeason": "graphStartSeason",
  "GraphEndSeason": "graphEndSeason",
  "GraphStat": "graphStat",
  "asynchFlag": "asynchFlag",
  "IsOnlyCurrentSeason": "isOnlyCurrentSeason",
  "AllStarSeason": "allStarSeason",
  "MeasureType": "measureType",
  "PerMode": "perMode",
  "PlusMinus": "plusMinus",
  "PaceAdjust": "paceAdjust",
  "Rank": "rank",
  "Outcome": "outcome",
  "Location": "location",
  "Month": "month",
  "SeasonSegment": "seasonSegment",
  "DateFrom": "dateFrom",
  "DateTo": "dateTo",
  "OpponentTeamID": "opponentTeamId",
  "VsConference": "vsConference",
  "VsDivision": "vsDivision",
  "GameSegment": "gameSegment",
  "Period": "period",
  "LastNGames": "lastNGames",
  "GameScope": "gameScope",
  "PlayerExperience": "playerExperience",
  "PlayerPosition": "playerPosition",
  "StarterBench": "starterBench",
  "TeamID": "teamId",
  "GameID": "gameId",
  "Position": "position",
  "RookieYear": "rookieYear",
  "ContextMeasure": "contextMeasure",
  "gameDate": "gameDate",
  "DayOffset": "dayOffset",
  "StartPeriod": "startPeriod",
  "EndPeriod": "endPeriod",
  "RangeType": "rangeType",
  "StartRange": "startRange",
  "EndRange": "endRange",
  "ContextFilter": "contextFilter",
  "zone-mode": "zoneMode",
  "GroupQuantity": "groupQuantity",
  "pageNo": "pageNo",
  "rowsPerPage": "rowsPerPage",
  "SeasonID": "seasonId",
  "PtMeasureType": "ptMeasureType",
  "StatType": "statType",
  "PlayerScope": "playerScope",
  "ClutchTime": "clutchTime",
  "AheadBehind": "aheadBehind",
  "PointDiff": "pointDiff",
});

const jsToNbaMap = blank(invert(nbaToJsMap));

const translateToNba = target => translateKeys(jsToNbaMap, target);
const translateFromNba = target => translateToNba(nbaToJsMap, target);

module.exports = {
  translateToNba,
  translateFromNba,
  jsToNbaMap,
  nbaToJsMap,
};
