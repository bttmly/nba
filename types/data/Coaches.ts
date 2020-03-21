export default interface Coaches {
  league: League;
}
export interface League {
  standard?: (StandardEntity)[] | null;
}
export interface StandardEntity {
  firstName: string;
  lastName: string;
  isAssistant: boolean;
  personId: string;
  teamId: string;
  sortSequence: string;
  college: string;
  teamSitesOnly: TeamSitesOnly;
}
export interface TeamSitesOnly {
  displayName: string;
  coachCode: string;
  coachRole: string;
  teamCode: string;
  teamTricode: string;
}
