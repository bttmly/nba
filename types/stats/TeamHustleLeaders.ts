export default interface TeamHustleLeaders {
  teamContestedShotsLeaders?: (TeamContestedShotsLeadersEntity)[] | null;
  teamChargesDrawnLeaders?: (TeamChargesDrawnLeadersEntity)[] | null;
  teamDeflectionsLeaders?: (TeamDeflectionsLeadersEntity)[] | null;
  teamLooseBallLeaders?: (TeamLooseBallLeadersEntity)[] | null;
  teamScreenAssistLeaders?: (TeamScreenAssistLeadersEntity)[] | null;
  table5?: (Table5EntityOrTable6Entity)[] | null;
  table6?: (Table5EntityOrTable6Entity)[] | null;
}
export interface TeamContestedShotsLeadersEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  contestedShots: number;
}
export interface TeamChargesDrawnLeadersEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  chargesDrawn: number;
}
export interface TeamDeflectionsLeadersEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  deflections: number;
}
export interface TeamLooseBallLeadersEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  looseBallsRecovered: number;
}
export interface TeamScreenAssistLeadersEntity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  screenAssists: number;
}
export interface Table5EntityOrTable6Entity {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  rank: number;
  boxOuts: number;
}
