export default interface TeamShooting {
  leagueDashPTShots?: (LeagueDashPTShotsEntity)[] | null;
}
export interface LeagueDashPTShotsEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
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
  fg2Pct: number;
  fg3aFrequency: number;
  fG3M: number;
  fG3A: number;
  fg3Pct: number;
}
