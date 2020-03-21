export default interface TeamStatsRankings {
  league: League;
}
export interface League {
  standard: StandardOrAfricaOrSacramentoOrVegasOrUtah;
  africa: StandardOrAfricaOrSacramentoOrVegasOrUtah;
  sacramento: StandardOrAfricaOrSacramentoOrVegasOrUtah;
  vegas: StandardOrAfricaOrSacramentoOrVegasOrUtah;
  utah: StandardOrAfricaOrSacramentoOrVegasOrUtah;
}
export interface StandardOrAfricaOrSacramentoOrVegasOrUtah {
  seasonYear: number;
  preseason: PreseasonOrRegularSeason;
  regularSeason: PreseasonOrRegularSeason;
  playoffs: Playoffs;
}
export interface PreseasonOrRegularSeason {
  teams?: (TeamsEntity)[] | null;
}
export interface TeamsEntity {
  teamId: string;
  name: string;
  nickname: string;
  teamcode: string;
  abbreviation: string;
  min: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  fgp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  tpp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  ftp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  orpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  drpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  trpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  apg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  tpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  spg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  bpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  pfpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  ppg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  oppg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  eff: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
}
export interface MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff {
  avg: string;
  rank: string;
}
export interface Playoffs {
  series?: (SeriesEntity)[] | null;
}
export interface SeriesEntity {
  seriesId: string;
  teams?: (TeamsEntity1)[] | null;
}
export interface TeamsEntity1 {
  teamId: string;
  min: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  fgp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  tpp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  ftp: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  orpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  drpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  trpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  apg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  tpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  spg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  bpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  pfpg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  ppg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
  oppg: MinOrFgpOrTppOrFtpOrOrpgOrDrpgOrTrpgOrApgOrTpgOrSpgOrBpgOrPfpgOrPpgOrOppgOrEff;
}
