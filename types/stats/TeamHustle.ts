export default interface TeamHustle {
  resource: string;
  parameters: Parameters;
  resultSets?: (ResultSetsEntity)[] | null;
}
export interface Parameters {
  PerMode: string;
  LeagueID: string;
  Season: string;
  SeasonType: string;
  PORound: number;
  Outcome?: null;
  Location?: null;
  Month: number;
  SeasonSegment?: null;
  DateFrom?: null;
  DateTo?: null;
  OpponentTeamID: number;
  VsConference?: null;
  VsDivision?: null;
  TeamID: number;
  Conference?: null;
  Division?: null;
  PlayerExperience?: null;
  PlayerPosition?: null;
  DraftYear?: null;
  DraftPick?: null;
  College?: null;
  Country?: null;
  Height?: null;
  Weight?: null;
}
export interface ResultSetsEntity {
  name: string;
  headers?: (string)[] | null;
  rowSet?: ((number | string)[] | null)[] | null;
}
