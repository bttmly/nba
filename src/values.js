const DEFAULT = "__DEFAULT__";

function DefaultTo (key, obj) {
  return { ...obj, [DEFAULT]: obj[key] };
}

function DefaultBlank (obj = {}) {
  return { ...obj, [DEFAULT]: "" };
}

function DefaultZero (obj = {}) {
  return { ...obj, [DEFAULT]: 0 };
}

function DefaultN (num = 0, obj = {}) { 
  return { ...obj, [DEFAULT]: num };
}

exports.League = DefaultTo("NBA", {
  NBA: "00",
});

exports.PerMode = DefaultTo("PerGame", {
  Totals: "Totals",
  PerGame: "PerGame",
  MinutesPer: "MinutesPer",
  Per48: "Per48",
  Per40: "Per40",
  Per36: "Per36",
  PerMinute: "PerMinute",
  PerPossession: "PerPossession",
  PerPlay: "PerPlay",
  Per100Possessions: "Per100Possessions",
  Per100Plays: "Per100Plays",
});

exports.SeasonType = DefaultTo("Regular", {
  Regular: "Regular Season",
  Playoffs: "Playoffs",
});

exports.MeasureType = DefaultTo("Base", {
  Base: "Base",
  Advanced: "Advanced",
  Misc: "Misc",
  FourFactors: "Four Factors",
  Scoring: "Scoring",
  Opponent: "Opponent",
  Usage: "Usage",
});

exports.GroupQuantity = { [DEFAULT]: 5 };

exports.Outcome = DefaultBlank({
  Win: "W",
  Loss: "L",
});

exports.Location = DefaultBlank({
  Home: "Home",
  Away: "Away",
});

exports.SeasonSegment = DefaultTo("EntireSeason", {
  EntireSeason: "",
  PreAllStar: "Pre All-Star",
  PostAllStar: "Post All-Star",
});

exports.DateFrom = DefaultBlank();
exports.DateTo = DefaultBlank();

exports.VsConference = DefaultTo("All", {
  All: "",
  East: "East",
  West: "West",
});

exports.VsDivision = DefaultTo("All", {
  All: "",
  Atlantic: "Atlantic",
  Central: "Central",
  Northwest: "Northwest",
  Pacific: "Pacific",
  Southeast: "Southeast",
  Southwest: "Southwest",
});

exports.GameSegment = DefaultTo("EntireGame", {
  EntireGame: "",
  FirstHalf: "First Half",
  SecondHalf: "Second Half",
  Overtime: "Overtime",
});


exports.ClutchTime = DefaultBlank({
  Last5Min: "Last 5 Minutes",
  Last4Min: "Last 4 Minutes",
  Last3Min: "Last 3 Minutes",
  Last2Min: "Last 2 Minutes",
  Last1Min: "Last 1 Minutes",
  Last30Sec: "Last 30 Seconds",
  Last10Sec: "Last 10 Seconds",
});

exports.ShotClockRange = DefaultBlank({
  24: "24-22",
  23: "24-22",
  22: "24-22",

  21: "22-18 Very Early",
  20: "22-18 Very Early",
  19: "22-18 Very Early",
  18: "22-18 Very Early",

  17: "18-15 Early",
  16: "18-15 Early",
  15: "18-15 Early",

  14: "15-7 Average",
  13: "15-7 Average",
  12: "15-7 Average",
  11: "15-7 Average",
  10: "15-7 Average",
  9: "15-7 Average",
  8: "15-7 Average",
  7: "15-7 Average",

  6: "7-4 Late",
  5: "7-4 Late",
  4: "7-4 Late",

  3: "4-0 Very Late",
  2: "4-0 Very Late",
  1: "4-0 Very Late",
  0: "4-0 Very Late",
});

exports.AheadBehind = DefaultBlank({
  AheadOrBehind: "Ahead or Behind",
  AheadOrTied: "Ahead or Tied",
  BehindOrTied: "Behind or Tied",
});

exports.PlusMinus = DefaultN();
exports.PaceAdjust = DefaultN();
exports.Rank = DefaultN();

exports.LastNGames = DefaultZero();
exports.OpponentTeamID = DefaultZero();

exports.Period = DefaultZero({
  AllQuarters: 0,
  FirstQuarter: 1,
  SecondQuarter: 2,
  ThirdQuarter: 3,
  FourthQuarter: 4,
  Overtime1: 5,
  Overtime2: 6,
  Overtime3: 7,
  Overtime4: 8,
  Overtime5: 9,
  Overtime6: 10,
});

exports.PlayoffRound = DefaultZero({
  All: 0,
  QuarterFinals: 1,
  SemiFinals: 2,
  ConferenceFinals: 3,
  Finals: 4,
});

exports.Month = DefaultZero({
  All: 0,
  October: 1,
  Novemeber: 2,
  December: 3,
  January: 4,
  February: 5,
  March: 6,
  April: 7,
  May: 8,
  June: 9,
  July: 10,
  August: 11,
  September: 12,
});

exports.RangeType = DefaultZero();
exports.StartRange = DefaultZero();
exports.EndRange = DefaultZero();

exports.StartPeriod = DefaultZero({
  AllQuarters: 0,
  FirstQuarter: 1,
  SecondQuarter: 2,
  ThirdQuarter: 3,
  FourthQuarter: 4,
});

exports.EndPeriod = DefaultZero({
  AllQuarters: 0,
  FirstQuarter: 1,
  SecondQuarter: 2,
  ThirdQuarter: 3,
  FourthQuarter: 4,
});

exports.StatCategory = DefaultTo("PTS", {
  PTS: "PTS",
  FGM: "FGM",
  FGA: "FGA",
  FG_PCT: "FG%",
  FG3M: "3PM",
  FG3A: "3PA",
  FG3_PCT: "3P%",
  FTM: "FTM",
  FTA: "FTA",
  FT_PCT: "FT%",
  OREB: "OREB",
  DREB: "DREB",
  REB: "REB",
  AST: "AST",
  STL: "STL",
  BLK: "BLK",
  TOV: "TOV",
  EFF: "EFF",
  AST_TOV: "AST/TO",
  STL_TOV: "STL/TOV",
  PF: "PF",
});

exports.ContextMeasure = DefaultTo("FGM", {
  FGM: "FGM",
  FGA: "FGA",
  FG_PCT: "FG_PCT",
  FG3M: "FG3m",
  FG3A: "FG3A",
  FG3_PCT: "FG3_PCT",
  PF: "PF",
  EFG_PCT: "EFG_PCT",
  TS_PCT: "TS_PCT",
  PTS_FB: "PTS_FB",
  PTS_OFF_TOV: "PTS_OFF_TOV",
  PTS_2ND_CHANCE: "PTS_2ND_CHANCE",
});

exports.Scope = DefaultTo("AllPlayers", {
  AllPlayers: "S",
  Rookies: "Rookies",
});

exports.PlayerScope = DefaultTo("AllPlayers", {
  AllPlayers: "All Players",
  Rookies: "Rookies",
});

exports.PlayerOrTeam = DefaultTo("Player", {
  Player: "Player",
  Team: "Team",
});

exports.GameScope = DefaultTo("Season", {
  Season: "Season",
  Last10: "Last 10",
  Yesterday: "Yesterday",
  Finals: "Finals",
});

exports.Game_Scope = DefaultBlank({
  Last10:"Last 10",
  Yesterday:"Yesterday",
});

exports.Player_or_Team = DefaultTo("Player", {
  Player: "P",
  Team: "T",
});

exports.Conference = { ...exports.VsConference };
exports.Division = { ...exports.VsDivision };

exports.TeamID = DefaultZero();
exports.GameID = DefaultZero();
exports.RookieYear = DefaultBlank();

exports.PlayerExperience = DefaultBlank({
  Rookie: "Rookie",
  Sophomore: "Sophomore",
  Veteran: "Veteran",
});

exports.PlayerPosition = DefaultBlank({
  Forward: "F",
  Center: "C",
  Guard: "G",
});

exports.StarterBench = DefaultBlank({
  Starters: "Starters",
  Bench: "Bench",
});

exports.DraftYear = DefaultBlank();

exports.DraftPick = DefaultBlank({
  FirstRound: "1st+Round",
  SecondRound: "2nd+Round",
  FirstPick: "1st+Pick",
  Lottery: "Lottery+Pick",
  Top5: "Top+5+Pick",
  Top10: "Top+10+Pick",
  Top15: "Top+15+Pick",
  Top20: "Top+20+Pick",
  Top25: "Top+25+Pick",
  Picks11Thru20: "Picks+11+Thru+20",
  Picks21Thru30: "Picks+21+Thru+30",
  Undrafted: "Undrafted",
});

exports.College = DefaultBlank();
exports.Country = DefaultBlank();
exports.Height = DefaultBlank();
exports.Weight = DefaultBlank();

exports.Counter = { [DEFAULT]: 1000 };

exports.Sorter = DefaultTo("PTS", {
  PTS: "PTS",
  FGM: "FGM",
  FGA: "FGA",
  FG_PCT: "FG_PCT",
  FG3M: "FG3M",
  FG3A: "FG3A",
  FG3_PCT: "FG3_PCT",
  FTM: "FTM",
  FTA: "FTA",
  FT_PCT: "FT_PCT",
  OREB: "OREB",
  DREB: "DREB",
  AST: "AST",
  STL: "STL",
  BLK: "BLK",
  TOV: "TOV",
  REB: "REB",
});

exports.Direction = DefaultTo("DESC", {
  DESC: "DESC",
  ASC: "ASC",
});
