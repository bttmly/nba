export default interface LeagueStandings {
  resource: string;
  parameters: Parameters;
  resultSets?: (ResultSetsEntity)[] | null;
}
export interface Parameters {
  LeagueID: string;
  SeasonYear: string;
  SeasonType: string;
}
export interface ResultSetsEntity {
  name: string;
  headers?: (string)[] | null;
  rowSet?: ((string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number)[] | null)[] | null;
}
