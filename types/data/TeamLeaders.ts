export default interface TeamLeaders {
  league: League;
}
export interface League {
  standard: StandardOrVegas;
  africa: AfricaOrSacramentoOrUtah;
  sacramento: AfricaOrSacramentoOrUtah;
  vegas: StandardOrVegas;
  utah: AfricaOrSacramentoOrUtah;
}
export interface StandardOrVegas {
  seasonStageId: number;
  ppg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  trpg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  apg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  fgp?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  tpp?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  ftp?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  bpg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  spg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  tpg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
  pfpg?: (PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity)[] | null;
}
export interface PpgEntityOrTrpgEntityOrApgEntityOrFgpEntityOrTppEntityOrFtpEntityOrBpgEntityOrSpgEntityOrTpgEntityOrPfpgEntity {
  personId: string;
  value: string;
}
export interface AfricaOrSacramentoOrUtah {
  seasonStageId: number;
  ppg?: (null)[] | null;
  trpg?: (null)[] | null;
  apg?: (null)[] | null;
  fgp?: (null)[] | null;
  tpp?: (null)[] | null;
  ftp?: (null)[] | null;
  bpg?: (null)[] | null;
  spg?: (null)[] | null;
  tpg?: (null)[] | null;
  pfpg?: (null)[] | null;
}
