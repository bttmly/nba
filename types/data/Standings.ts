export default interface Standings {
  league: League;
}
export interface League {
  standard: StandardOrSacramentoOrVegasOrUtah;
  africa: Africa;
  sacramento: StandardOrSacramentoOrVegasOrUtah;
  vegas: StandardOrSacramentoOrVegasOrUtah;
  utah: StandardOrSacramentoOrVegasOrUtah;
}
export interface StandardOrSacramentoOrVegasOrUtah {
  seasonYear: number;
  seasonStageId: number;
  teams?: (TeamsEntity)[] | null;
}
export interface TeamsEntity {
  teamId: string;
  win: string;
  loss: string;
  winPct: string;
  winPctV2: string;
  lossPct: string;
  lossPctV2: string;
  gamesBehind: string;
  divGamesBehind: string;
  clinchedPlayoffsCode: string;
  clinchedPlayoffsCodeV2: string;
  confRank: string;
  confWin: string;
  confLoss: string;
  divWin: string;
  divLoss: string;
  homeWin: string;
  homeLoss: string;
  awayWin: string;
  awayLoss: string;
  lastTenWin: string;
  lastTenLoss: string;
  streak: string;
  divRank: string;
  isWinStreak: boolean;
  teamSitesOnly: TeamSitesOnly;
  tieBreakerPts: string;
  sortKey: SortKey;
}
export interface TeamSitesOnly {
  teamKey: string;
  teamName: string;
  teamCode: string;
  teamNickname: string;
  teamTricode: string;
  clinchedConference: string;
  clinchedDivision: string;
  clinchedPlayoffs: string;
  streakText: string;
}
export interface SortKey {
  defaultOrder: number;
  nickname: number;
  win: number;
  loss: number;
  winPct: number;
  gamesBehind: number;
  confWinLoss: number;
  divWinLoss: number;
  homeWinLoss: number;
  awayWinLoss: number;
  lastTenWinLoss: number;
  streak: number;
}
export interface Africa {
  seasonYear: number;
  seasonStageId: number;
  teams?: (null)[] | null;
}
