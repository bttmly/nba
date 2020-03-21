export default interface TeamHustle {
  hustleStatsTeam?: (HustleStatsTeamEntity)[] | null;
}
export interface HustleStatsTeamEntity {
  teamId: number;
  teamName: string;
  min: number;
  contestedShots: number;
  contestedShots2pt: number;
  contestedShots3pt: number;
  deflections: number;
  chargesDrawn: number;
  screenAssists: number;
  screenAstPts: number;
  offLooseBallsRecovered: number;
  defLooseBallsRecovered: number;
  looseBallsRecovered: number;
  pctLooseBallsRecoveredOff: number;
  pctLooseBallsRecoveredDef: number;
  offBoxouts: number;
  defBoxouts: number;
  boxOuts: number;
  pctBoxOutsOff: number;
  pctBoxOutsDef: number;
}
