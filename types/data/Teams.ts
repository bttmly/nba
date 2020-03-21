export default interface Teams {
  league: League;
}
export interface League {
  standard?: (StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  africa?: (StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  sacramento?: (StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  vegas?: (StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  utah?: (StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
}
export interface StandardEntityOrAfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity {
  isNBAFranchise: boolean;
  isAllStar: boolean;
  city: string;
  altCityName: string;
  fullName: string;
  tricode: string;
  teamId: string;
  nickname: string;
  urlName: string;
  teamShortName: string;
  confName: string;
  divName: string;
}
