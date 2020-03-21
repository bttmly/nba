export default interface BoxScore {
  playerStats?: (PlayerStatsEntity)[] | null;
  teamStats?: (TeamStatsEntity)[] | null;
  teamStarterBenchStats?: (TeamStarterBenchStatsEntity)[] | null;
}
export interface PlayerStatsEntity {
  gameId: string;
  teamId: number;
  teamAbbreviation: string;
  teamCity: string;
  playerId: number;
  playerName: string;
  startPosition: string;
  comment: string;
  min: string;
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
  to: number;
  pf: number;
  pts: number;
  plusMinus: number;
}
export interface TeamStatsEntity {
  gameId: string;
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  teamCity: string;
  min: string;
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
  to: number;
  pf: number;
  pts: number;
  plusMinus: number;
}
export interface TeamStarterBenchStatsEntity {
  gameId: string;
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  teamCity: string;
  startersBench: string;
  min: string;
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
  to: number;
  pf: number;
  pts: number;
}
