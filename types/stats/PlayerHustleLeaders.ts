export default interface PlayerHustleLeaders {
  resource: string;
  parameters: Parameters;
  resultSets?: (ResultSetsEntity)[] | null;
}
export interface Parameters {
  PerMode: string;
  LeagueID: string;
  Season: string;
  SeasonType: string;
  PORound?: null;
  Outcome?: null;
  Location?: null;
  Month?: null;
  SeasonSegment?: null;
  DateFrom?: null;
  DateTo?: null;
  OpponentTeamID?: null;
  VsConference?: null;
  VsDivision?: null;
  TeamID?: null;
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
  rowSet?: ((number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string)[] | null)[] | null;
}
