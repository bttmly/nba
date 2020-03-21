export default interface LeagueGameLog {
  leagueGameLog?: (LeagueGameLogEntity)[] | null;
}
export interface LeagueGameLogEntity {
  seasonId: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  gameId: string;
  gameDate: string;
  matchup: string;
  wl: string;
  min: number;
  fgm: number;
  fga: number;
  fgPct: number;
  fG3M: number;
  fG3A: number;
  fg3Pct: number;
  ftm: number;
  fta: number;
  ftPct: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
  pts: number;
  plusMinus: number;
  videoAvailable: number;
}
