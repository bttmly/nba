export default interface Schedule {
  league: League;
}
export interface League {
  standard?: (StandardEntity)[] | null;
  africa?: (AfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  sacramento?: (AfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  vegas?: (AfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
  utah?: (AfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity)[] | null;
}
export interface StandardEntity {
  gameId: string;
  seasonStageId: number;
  gameUrlCode: string;
  statusNum: number;
  extendedStatusNum: number;
  isStartTimeTBD: boolean;
  startTimeUTC: string;
  startDateEastern: string;
  startTimeEastern: string;
  isBuzzerBeater: boolean;
  period: Period;
  nugget: Nugget;
  tags?: (string)[] | null;
  hTeam: HTeamOrVTeam;
  vTeam: HTeamOrVTeam;
  watch: Watch;
  playoffs?: Playoffs | null;
}
export interface Period {
  current: number;
  type: number;
  maxRegular: number;
}
export interface Nugget {
  text: string;
}
export interface HTeamOrVTeam {
  teamId: string;
  score: string;
  win: string;
  loss: string;
}
export interface Watch {
  broadcast: Broadcast;
}
export interface Broadcast {
  video: Video;
}
export interface Video {
  regionalBlackoutCodes: string;
  isLeaguePass: boolean;
  isNationalBlackout: boolean;
  isTNTOT: boolean;
  canPurchase: boolean;
  isVR: boolean;
  isNextVR: boolean;
  isNBAOnTNTVR: boolean;
  isMagicLeap: boolean;
  isOculusVenues: boolean;
  national: National;
  canadian?: (null)[] | null;
  spanish_national?: (null)[] | null;
}
export interface National {
  broadcasters?: (null)[] | null;
}
export interface Playoffs {
  roundNum: string;
  confName: string;
  seriesId: string;
  seriesSummaryText: string;
  isSeriesCompleted: boolean;
  gameNumInSeries: string;
  isIfNecessary: boolean;
  vTeam: VTeamOrHTeam;
  hTeam: VTeamOrHTeam;
}
export interface VTeamOrHTeam {
  seedNum: string;
  seriesWin: string;
  isSeriesWinner: boolean;
}
export interface AfricaEntityOrSacramentoEntityOrVegasEntityOrUtahEntity {
  gameId: string;
  seasonStageId: number;
  gameUrlCode: string;
  statusNum: number;
  extendedStatusNum: number;
  isStartTimeTBD: boolean;
  startTimeUTC: string;
  startDateEastern: string;
  startTimeEastern: string;
  isBuzzerBeater: boolean;
  period: Period;
  nugget: Nugget;
  tags?: (string)[] | null;
  hTeam: HTeamOrVTeam;
  vTeam: HTeamOrVTeam;
  watch: Watch;
}
