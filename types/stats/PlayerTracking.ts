export default interface PlayerTracking {
  leagueDashPtStats?: (LeagueDashPtStatsEntity)[] | null;
}
export interface LeagueDashPtStatsEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  gp: number;
  w: number;
  l: number;
  min: number;
  catchShootFgm: number;
  catchShootFga: number;
  catchShootFgPct?: number | null;
  catchShootPts: number;
  catchShootFg3m?: number | null;
  catchShootFg3a?: number | null;
  catchShootFg3Pct?: number | null;
  catchShootEfgPct?: number | null;
}
