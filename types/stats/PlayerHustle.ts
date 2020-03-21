export default interface PlayerHustle {
  hustleStatsPlayer?: (HustleStatsPlayerEntity)[] | null;
}
export interface HustleStatsPlayerEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  g: number;
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
  boxOutPlayerTeamRebs: number;
  boxOutPlayerRebs: number;
  pctBoxOutsOff: number;
  pctBoxOutsDef: number;
  pctBoxOutsTeamReb: number;
  pctBoxOutsReb: number;
}
