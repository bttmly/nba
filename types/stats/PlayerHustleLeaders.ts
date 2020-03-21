export default interface PlayerHustleLeaders {
  playerContestedShotsLeaders?: (PlayerContestedShotsLeadersEntity)[] | null;
  playerChargesDrawnLeaders?: (PlayerChargesDrawnLeadersEntity)[] | null;
  playerDeflectionsLeaders?: (PlayerDeflectionsLeadersEntity)[] | null;
  playerLooseBallLeaders?: (PlayerLooseBallLeadersEntity)[] | null;
  playerScreenAssistLeaders?: (PlayerScreenAssistLeadersEntity)[] | null;
  table5?: (Table5Entity)[] | null;
}
export interface PlayerContestedShotsLeadersEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  contestedShots: number;
}
export interface PlayerChargesDrawnLeadersEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  chargesDrawn: number;
}
export interface PlayerDeflectionsLeadersEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  deflections: number;
}
export interface PlayerLooseBallLeadersEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  looseBallsRecovered: number;
}
export interface PlayerScreenAssistLeadersEntity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  screenAssists: number;
}
export interface Table5Entity {
  playerId: number;
  playerName: string;
  teamId: number;
  teamAbbreviation: string;
  age: number;
  rank: number;
  boxOuts: number;
}
