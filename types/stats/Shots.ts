export default interface Shots {
  shot_Chart_Detail?: (ShotChartDetailEntity)[] | null;
  leagueAverages?: (LeagueAveragesEntity)[] | null;
}
export interface ShotChartDetailEntity {
  gridType: string;
  gameId: string;
  gameEventId: number;
  playerId: number;
  playerName: string;
  teamId: number;
  teamName: string;
  period: number;
  minutesRemaining: number;
  secondsRemaining: number;
  eventType: string;
  actionType: string;
  shotType: string;
  shotZoneBasic: string;
  shotZoneArea: string;
  shotZoneRange: string;
  shotDistance: number;
  locX: number;
  locY: number;
  shotAttemptedFlag: number;
  shotMadeFlag: number;
  gameDate: string;
  htm: string;
  vtm: string;
}
export interface LeagueAveragesEntity {
  gridType: string;
  shotZoneBasic: string;
  shotZoneArea: string;
  shotZoneRange: string;
  fga: number;
  fgm: number;
  fgPct: number;
}
