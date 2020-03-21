export default interface PlayerInfo {
  commonPlayerInfo?: (CommonPlayerInfoEntity)[] | null;
  playerHeadlineStats?: (PlayerHeadlineStatsEntity)[] | null;
  availableSeasons?: (AvailableSeasonsEntity)[] | null;
}
export interface CommonPlayerInfoEntity {
  personId: number;
  firstName: string;
  lastName: string;
  displayFirstLast: string;
  displayLastCommaFirst: string;
  displayFiLast: string;
  birthdate: string;
  school: string;
  country: string;
  lastAffiliation: string;
  height: string;
  weight: string;
  seasonExp: number;
  jersey: string;
  position: string;
  rosterstatus: string;
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  teamCode: string;
  teamCity: string;
  playercode: string;
  fromYear: number;
  toYear: number;
  dleagueFlag: string;
  nbaFlag: string;
  gamesPlayedFlag: string;
  draftYear: string;
  draftRound: string;
  draftNumber: string;
}
export interface PlayerHeadlineStatsEntity {
  playerId: number;
  playerName: string;
  timeFrame: string;
  pts: number;
  ast: number;
  reb: number;
  pie: number;
}
export interface AvailableSeasonsEntity {
  seasonId: string;
}
