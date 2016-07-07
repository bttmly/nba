const DEFAULT = exports.DEFAULT = "__DEFAULT__";

function DefaultTo (key, obj = {}) {
  return Object.freeze({ ...obj, [DEFAULT]: obj[key] });
}

function DefaultBlank (obj = {}) {
  return Object.freeze({ ...obj, [DEFAULT]: "" });
}

function DefaultZero (obj = {}) {
  return Object.freeze({ ...obj, [DEFAULT]: 0 });
}

function DefaultN (obj = {}) { 
  return Object.freeze({ ...obj, [DEFAULT]: "N" });
}

exports.Season =
DefaultTo("2015-16", {
  "1996-97": "1996-97",
  "1997-98": "1997-98",
  "1998-99": "1998-99",
  "1999-00": "1999-00",
  "2000-01": "2000-01",
  "2001-02": "2001-02",
  "2002-03": "2002-03",
  "2003-04": "2003-04",
  "2004-05": "2004-05",
  "2005-06": "2005-06",
  "2006-07": "2006-07",
  "2007-08": "2007-08",
  "2008-09": "2008-09",
  "2009-10": "2009-10",
  "2010-11": "2010-11",
  "2011-12": "2011-12",
  "2012-13": "2012-13",
  "2013-14": "2013-14",
  "2014-15": "2014-15",
  "2015-16": "2015-16",
});

exports.GraphStartSeason = exports.Season;
exports.GraphEndSeason = exports.Season;

exports.LeagueID = DefaultTo("NBA", {
  NBA: "00",
});

exports.PlayerID = DefaultZero();

exports.League = DefaultTo("NBA", {
  NBA: "00",
});

exports.IsOnlyCurrentSeason = DefaultTo(1, { 0: 0, 1: 1 });
exports.AllStarSeason = DefaultBlank();

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

exports.SeasonType = DefaultTo("Regular Season", {
  "Regular Season": "Regular Season",
  Playoffs: "Playoffs",
});

exports.MeasureType = DefaultTo("Base", {
  Base: "Base",
  Advanced: "Advanced",
  Misc: "Misc",
  "Four Factors": "Four Factors",
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

exports.Conference =
exports.VsConference = DefaultTo("All", {
  All: "",
  East: "East",
  West: "West",
});

exports.Division =
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
  "First Half": "First Half",
  "Second Half": "Second Half",
  Overtime: "Overtime",
});


exports.ClutchTime = DefaultBlank({
  "Last 5 Minutes": "Last 5 Minutes",
  "Last 4 Minutes": "Last 4 Minutes",
  "Last 3 Minutes": "Last 3 Minutes",
  "Last 2 Minutes": "Last 2 Minutes",
  "Last 1 Minutes": "Last 1 Minutes",
  "Last 30 Seconds": "Last 30 Seconds",
  "Last 10 Seconds": "Last 10 Seconds",
});

// exports.ShotClockRange = DefaultBlank({
//   24: "24-22",
//   23: "24-22",
//   22: "24-22",

//   21: "22-18 Very Early",
//   20: "22-18 Very Early",
//   19: "22-18 Very Early",
//   18: "22-18 Very Early",

//   17: "18-15 Early",
//   16: "18-15 Early",
//   15: "18-15 Early",

//   14: "15-7 Average",
//   13: "15-7 Average",
//   12: "15-7 Average",
//   11: "15-7 Average",
//   10: "15-7 Average",
//   9: "15-7 Average",
//   8: "15-7 Average",
//   7: "15-7 Average",

//   6: "7-4 Late",
//   5: "7-4 Late",
//   4: "7-4 Late",

//   3: "4-0 Very Late",
//   2: "4-0 Very Late",
//   1: "4-0 Very Late",
//   0: "4-0 Very Late",
// });

exports.ShotClockRange = DefaultBlank({
  "24-22": "24-22",
  "22-18 Very Early": "22-18 Very Early",
  "18-15 Early": "18-15 Early",
  "15-7 Average": "15-7 Average",
  "7-4 Late": "7-4 Late",
  "4-0 Very Late": "4-0 Very Late",
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

exports.StartPeriod =
exports.EndPeriod = 
exports.Period = DefaultZero({
  // AllQuarters
  0: 0,
  // FirstQuarter
  1: 1,
  // SecondQuarter
  2: 2,
  // ThirdQuarter
  3: 3,
  // FourthQuarter
  4: 4,
  // Overtime1
  5: 5,
  // Overtime2
  6: 6,
  // Overtime3
  7: 7,
  // Overtime4
  8: 8,
  // Overtime5
  9: 9,
  // Overtime6
  10: 10,
});

exports.PORound =
exports.PlayoffRound = DefaultZero({
  // All
  0: 0,
  // QuarterFinals
  1: 1,
  // SemiFinals
  2: 2,
  // ConferenceFinals
  3: 3,
  // Finals
  4: 4,
});

exports.Month = DefaultZero({
  // All
  0: 0,
  // October
  1: 1,
  // Novemeber
  2: 2,
  // December
  3: 3,
  // January
  4: 4,
  // February
  5: 5,
  // March
  6: 6,
  // April
  7: 7,
  // May
  8: 8,
  // June
  9: 9,
  // July
  10: 10,
  // August
  11: 11,
  // September
  12: 12,
});

exports.RangeType = DefaultZero();
exports.StartRange = DefaultZero();
exports.EndRange = DefaultZero();

exports.StartPeriod = DefaultZero({
  // All quarters
  0: 0,
  // First quarter
  1: 1,
  // Second quarter
  2: 2,
  // Third quarter
  3: 3,
  // Fourth quarter
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
exports.GraphStat = exports.StatCategory;

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
  "All Players": "All Players",
  Rookies: "Rookies",
});

exports.PlayerOrTeam = DefaultTo("Player", {
  Player: "Player",
  Team: "Team",
});

exports.GameScope = DefaultBlank("", {
  Season: "Season",
  "Last 10": "Last 10",
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

exports.gameDate =
exports.GameDate = DefaultBlank();

exports.RookieYear = DefaultBlank();

exports.TeamID = DefaultZero();
exports.DayOffset = DefaultZero();

exports.GameID = DefaultBlank();

exports.SeasonID = DefaultZero();

exports.PlayerExperience = DefaultBlank({
  Rookie: "Rookie",
  Sophomore: "Sophomore",
  Veteran: "Veteran",
});

exports.Position =
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
  "1st+Round": "1st+Round",
  "2nd+Round": "2nd+Round",
  "1st+Pick": "1st+Pick",
  "Lottery+Pick": "Lottery+Pick",
  "Top+5+Pick": "Top+5+Pick",
  "Top+10+Pick": "Top+10+Pick",
  "Top+15+Pick": "Top+15+Pick",
  "Top+20+Pick": "Top+20+Pick",
  "Top+25+Pick": "Top+25+Pick",
  "Picks+11+Thru+20": "Picks+11+Thru+20",
  "Picks+21+Thru+30": "Picks+21+Thru+30",
  "Undrafted": "Undrafted",
});

exports.College = DefaultBlank();
exports.Country = DefaultBlank();
exports.Height = DefaultBlank();
exports.Weight = DefaultBlank();

exports.Counter = Default(1000);

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

exports.PtMeasureType = DefaultBlank({
  // Catch and Shoot: Any jump shot outside of 10 feet where a player possessed the ball for 2 seconds or less and took no dribbles.
  CatchShoot: "CatchShoot",
  // Defensive Impact: Statistics measuring the impact a player has on defense, including blocks, steals and protecting the rim, which measures the opponent's field goal percentage at the rim while it is being defended. Rim protection is defined as the defender being within five feet of the basket and within five feet of the offensive player attempting the shot.
  Defense: "Defense",
  // Drives: Any touch that starts at least 20 feet of the hoop and is dribbled within 10 feet of the hoop and excludes fast breaks. Measures the total number of drives as well as the points, assists and shooting percentages on drives to the basket.
  Drives: "Drives",
  // Passing: The total number of passes a player makes and the scoring opportunities that come from those passes, whether they lead directly to a teammate scoring a basket or free throw, or if they set up an assist for another teammate.
  Passing: "Passing",
  // Touches/Possession: The number of times a player touches and possesses the ball, where those touches occur on the court, how long the player possessed the ball and the number of points, assists and turnovers that occur with the ball in his possession.
  Possessions: "Possessions",
  // Pull Up Shots: Any jump shot outside 10 feet where a player took 1 or more dribbles before shooting.
  PullUpShot: "PullUpShot",
  // Rebounding Opportunities: The number of times player was within the vicinity (3.5 ft) of a rebound. Measures the number of rebounds a player recovers compared to the number of rebounding chances available as well as whether or not the rebound was contested by an opponent or deferred to a teammate.
  Rebounding: "Rebounding",
  // Shooting Efficiency: Measures shooting percentages from different types of shots - Drives, Close Shots, Catch and Shoots and Pull Up Shots.
  Efficiency: "Efficiency",
  // Speed and Distance: Statistics that measure the distance covered and the average speed of all movements (sprinting, jogging, standing, walking, backwards and forwards) by a player while on the court.
  SpeedDistance: "SpeedDistance",
  // Elbow Touch: Touches that originate within the 5 foot radius nearing the edge of the lane and free throw line, inside the 3 point line.
  ElbowTouch: "ElbowTouch",
  // Post Touch: Touches that originate from a pass and reception within 12 feet of the basket.
  PostTouch: "PostTouch",
  // Paint Touch: Touches that originate from a pass and reception within the paint.
  PaintTouch: "PaintTouch",
});

// these are for "play type" data, and are lower case, for some reason
// I elected to namespace these because the parameter names are so general ('name', 'category') and they are all specific to play type
exports.PlayType = {
  name: DefaultTo("offensive"),
  category: DefaultBlank({
    Transition: "Transition",
    Isolation: "Isolation",
    PRBallHandler: "PRBallHandler",
    PRRollman: "PRRollman",
    Postup: "Postup",
    Spotup: "Spotup",
    Handoff: "Handoff",
    Cut: "Cut",
    OffScreen: "OffScreen",
    OffRebound: "OffRebound",
    Misc: "Misc",
  }),
  limit: DefaultTo(500),
  season: 2015, // note, this is a different format than _S_eason above ("2015-16")
  seasonType: "Post", // note, this is a different format than _S_easonType above ("Playoffs")
};
