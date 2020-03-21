export default interface Scoreboard {
  gameHeader?: (GameHeaderEntity)[] | null;
  lineScore?: (LineScoreEntity)[] | null;
  seriesStandings?: (SeriesStandingsEntity)[] | null;
  lastMeeting?: (LastMeetingEntity)[] | null;
  eastConfStandingsByDay?: (EastConfStandingsByDayEntityOrWestConfStandingsByDayEntity)[] | null;
  westConfStandingsByDay?: (EastConfStandingsByDayEntityOrWestConfStandingsByDayEntity)[] | null;
  available?: (AvailableEntity)[] | null;
}
export interface GameHeaderEntity {
  gameDateEst: string;
  gameSequence: number;
  gameId: string;
  gameStatusId: number;
  gameStatusText: string;
  gamecode: string;
  homeTeamId: number;
  visitorTeamId: number;
  season: string;
  livePeriod: number;
  livePcTime: string;
  natlTvBroadcasterAbbreviation?: string | null;
  livePeriodTimeBcast: string;
  whStatus: number;
}
export interface LineScoreEntity {
  gameDateEst: string;
  gameSequence: number;
  gameId: string;
  teamId: number;
  teamAbbreviation: string;
  teamCityName: string;
  teamWinsLosses: string;
  ptsQtr1: number;
  ptsQtr2: number;
  ptsQtr3: number;
  ptsQtr4: number;
  ptsOt1: number;
  ptsOt2: number;
  ptsOt3: number;
  ptsOt4: number;
  ptsOt5: number;
  ptsOt6: number;
  ptsOt7: number;
  ptsOt8: number;
  ptsOt9: number;
  ptsOt10: number;
  pts: number;
  fgPct: number;
  ftPct: number;
  fg3Pct: number;
  ast: number;
  reb: number;
  tov: number;
}
export interface SeriesStandingsEntity {
  gameId: string;
  homeTeamId: number;
  visitorTeamId: number;
  gameDateEst: string;
  homeTeamWins: number;
  homeTeamLosses: number;
  seriesLeader: string;
}
export interface LastMeetingEntity {
  gameId: string;
  lastGameId: string;
  lastGameDateEst: string;
  lastGameHomeTeamId: number;
  lastGameHomeTeamCity: string;
  lastGameHomeTeamName: string;
  lastGameHomeTeamAbbreviation: string;
  lastGameHomeTeamPoints: number;
  lastGameVisitorTeamId: number;
  lastGameVisitorTeamCity: string;
  lastGameVisitorTeamName: string;
  lastGameVisitorTeamCity1: string;
  lastGameVisitorTeamPoints: number;
}
export interface EastConfStandingsByDayEntityOrWestConfStandingsByDayEntity {
  teamId: number;
  leagueId: string;
  seasonId: string;
  standingsdate: string;
  conference: string;
  team: string;
  g: number;
  w: number;
  l: number;
  wPct: number;
  homeRecord: string;
  roadRecord: string;
}
export interface AvailableEntity {
  gameId: string;
  ptAvailable: number;
}
