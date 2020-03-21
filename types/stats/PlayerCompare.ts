export default interface PlayerCompare {
  overallCompare?: (OverallCompareEntityOrIndividualEntity)[] | null;
  individual?: (OverallCompareEntityOrIndividualEntity)[] | null;
}
export interface OverallCompareEntityOrIndividualEntity {
  groupSet: string;
  description: string;
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
  tov: number;
  stl: number;
  blk: number;
  blka: number;
  pf: number;
  pfd: number;
  pts: number;
  plusMinus: number;
}
