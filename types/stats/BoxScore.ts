export default interface BoxScore {
  resource: string;
  parameters: Parameters;
  resultSets?: (ResultSetsEntity)[] | null;
}
export interface Parameters {
  GameID: string;
  StartPeriod: number;
  EndPeriod: number;
  StartRange: number;
  EndRange: number;
  RangeType: number;
}
export interface ResultSetsEntity {
  name: string;
  headers?: (string)[] | null;
  rowSet?: ((string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number | string | number)[] | null)[] | null;
}
