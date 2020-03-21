export default interface BoxScoreSummary {
  gameSummary?: (GameSummaryEntity)[] | null;
  otherStats?: (OtherStatsEntity)[] | null;
  officials?: (OfficialsEntity)[] | null;
  inactivePlayers?: (InactivePlayersEntity)[] | null;
  gameInfo?: (GameInfoEntity)[] | null;
  lineScore?: (LineScoreEntity)[] | null;
  lastMeeting?: (LastMeetingEntity)[] | null;
  seasonSeries?: (SeasonSeriesEntity)[] | null;
  availableVideo?: (AvailableVideoEntity)[] | null;
}
export interface GameSummaryEntity {
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
  natlTvBroadcasterAbbreviation?: null;
  livePeriodTimeBcast: string;
  whStatus: number;
}
export interface OtherStatsEntity {
  leagueId: string;
  teamId: number;
  teamAbbreviation: string;
  teamCity: string;
  ptsPaint: number;
  pts2ndChance: number;
  ptsFb: number;
  largestLead: number;
  leadChanges: number;
  timesTied: number;
  teamTurnovers: number;
  totalTurnovers: number;
  teamRebounds: number;
  ptsOffTo: number;
}
export interface OfficialsEntity {
  officialId: number;
  firstName: string;
  lastName: string;
  jerseyNum: string;
}
export interface InactivePlayersEntity {
  playerId: number;
  firstName: string;
  lastName: string;
  jerseyNum: string;
  teamId: number;
  teamCity: string;
  teamName: string;
  teamAbbreviation: string;
}
export interface GameInfoEntity {
  gameDate: string;
  attendance: number;
  gameTime: string;
}
export interface LineScoreEntity {
  gameDateEst: string;
  gameSequence: number;
  gameId: string;
  teamId: number;
  teamAbbreviation: string;
  teamCityName: string;
  teamNickname: string;
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
export interface SeasonSeriesEntity {
  gameId: string;
  homeTeamId: number;
  visitorTeamId: number;
  gameDateEst: string;
  homeTeamWins: number;
  homeTeamLosses: number;
  seriesLeader: string;
}
export interface AvailableVideoEntity {
  gameId: string;
  videoAvailableFlag: number;
  ptAvailable: number;
  ptXyzAvailable: number;
  whStatus: number;
  hustleStatus: number;
  historicalStatus: number;
}
