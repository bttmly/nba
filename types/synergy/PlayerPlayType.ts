export default interface PlayerPlayType {
  result_count: number;
  results?: (ResultsEntity)[] | null;
}
export interface ResultsEntity {
  PlayerIDSID: number;
  PlayerFirstName: string;
  PlayerLastName: string;
  PlayerNumber: number;
  P: string;
  TeamIDSID: number;
  TeamName: string;
  TeamNameAbbreviation: string;
  TeamShortName: string;
  GP: number;
  Poss: number;
  Time: number;
  Points: number;
  FGA: number;
  FGM: number;
  PPP: number;
  WorsePPP: number;
  BetterPPP: number;
  PossG: number;
  PPG: number;
  FGAG: number;
  FGMG: number;
  FGmG: number;
  FGm: number;
  FG: number;
  aFG: number;
  FT: number;
  TO: number;
  SF: number;
  PlusOne: number;
  Score: number;
  name: string;
  season: number;
  seasonType: string;
}
