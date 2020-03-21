export default interface CommonTeamRoster {
  commonTeamRoster?: (CommonTeamRosterEntity)[] | null;
  coaches?: (CoachesEntity)[] | null;
}
export interface CommonTeamRosterEntity {
  teamID: number;
  season: string;
  leagueID: string;
  player: string;
  num: string;
  position: string;
  height: string;
  weight: string;
  birthDate: string;
  age: number;
  exp: string;
  school: string;
  playerId: number;
}
export interface CoachesEntity {
  teamId: number;
  season: string;
  coachId: number;
  firstName: string;
  lastName: string;
  coachName: string;
  isAssistant: number;
  coachType: string;
  sortSequence: number;
}
