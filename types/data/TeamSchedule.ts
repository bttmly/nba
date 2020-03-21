export default interface TeamSchedule {
  league: League;
}
export interface League {
  lastStandardGamePlayedIndex: number;
  standard?: (StandardEntityOrVegasEntity)[] | null;
  africa?: (null)[] | null;
  sacramento?: (null)[] | null;
  vegas?: (StandardEntityOrVegasEntity)[] | null;
  utah?: (null)[] | null;
}
export interface StandardEntityOrVegasEntity {
  seasonStageId: number;
  seasonId: string;
  gameUrlCode: string;
  gameId: string;
  statusNum: number;
  extendedStatusNum: number;
  startTimeUTC: string;
  startDateEastern: string;
  homeStartDate: string;
  homeStartTime: string;
  visitorStartDate: string;
  visitorStartTime: string;
  isHomeTeam: boolean;
  watch: Watch;
  nugget: Nugget;
  vTeam: VTeamOrHTeam;
  hTeam: VTeamOrHTeam;
}
export interface Watch {
  broadcast: Broadcast;
}
export interface Broadcast {
  broadcasters: Broadcasters;
  video: Video;
  audio: Audio;
}
export interface Broadcasters {
  national?: (null)[] | null;
  canadian?: (null)[] | null;
  spanish_national?: (null)[] | null;
  vTeam?: (null)[] | null;
  hTeam?: (null)[] | null;
}
export interface Video {
  regionalBlackoutCodes: string;
  canPurchase: boolean;
  isLeaguePass: boolean;
  isNationalBlackout: boolean;
  isTNTOT: boolean;
  isVR: boolean;
  tntotIsOnAir: boolean;
  isNextVR: boolean;
  isNBAOnTNTVR: boolean;
  isMagicLeap: boolean;
  isOculusVenues: boolean;
  streams?: (StreamsEntity)[] | null;
  deepLink?: (null)[] | null;
}
export interface StreamsEntity {
  streamType: string;
  isOnAir: boolean;
  doesArchiveExist: boolean;
  isArchiveAvailToWatch: boolean;
  streamId: string;
  duration: number;
}
export interface Audio {
  national: National;
  vTeam: VTeamOrHTeam1;
  hTeam: VTeamOrHTeam1;
}
export interface National {
  streams?: (StreamsEntity1)[] | null;
  broadcasters?: (null)[] | null;
}
export interface StreamsEntity1 {
  language: string;
  isOnAir: boolean;
  streamId: string;
}
export interface VTeamOrHTeam1 {
  streams?: (StreamsEntity1)[] | null;
  broadcasters?: (BroadcastersEntity)[] | null;
}
export interface BroadcastersEntity {
  shortName: string;
  longName: string;
}
export interface Nugget {
  text: string;
}
export interface VTeamOrHTeam {
  teamId: string;
  score: string;
}
