export default interface PlayerShooting {
  leagueDashPTShots?: (LeagueDashPTShotsEntity)[] | null;
}
export interface LeagueDashPTShotsEntity {
  playerId: number;
  playerName: string;
  playerLastTeamId: number;
  playerLastTeamAbbreviation: string;
  age: number;
  gp: number;
  g: number;
  fgaFrequency: number;
  fgm: number;
  fga: number;
  fgPct: number;
  efgPct: number;
  fg2aFrequency: number;
  fG2M: number;
  fG2A: number;
  fg2Pct?: number | null;
  fg3aFrequency: number;
  fG3M: number;
  fG3A: number;
  fg3Pct?: number | null;
}
