export default interface BoxScoreSummary {
  resource: string;
  parameters: Parameters;
  resultSets?: (ResultSetsEntity)[] | null;
}
export interface Parameters {
  GameID: string;
}
export interface ResultSetsEntity {
  name: string;
  headers?: (string)[] | null;
  rowSet?: ((string | number | string | number | string | number | number | string | number | string | number | string | number | string | number | string | number | string | number | string | string | number | string | number | string | number | string | number | string | number | string | number)[] | null)[] | null;
}
