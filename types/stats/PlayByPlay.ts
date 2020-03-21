export default interface PlayByPlay {
  playByPlay?: (PlayByPlayEntity)[] | null;
  availableVideo?: (AvailableVideoEntity)[] | null;
}
export interface PlayByPlayEntity {
  gameId: string;
  eventnum: number;
  eventmsgtype: number;
  eventmsgactiontype: number;
  period: number;
  wctimestring: string;
  pctimestring: string;
  homedescription?: string | null;
  neutraldescription?: null;
  visitordescription?: string | null;
  score?: string | null;
  scoremargin?: string | null;
}
export interface AvailableVideoEntity {
  videoAvailableFlag: number;
}
