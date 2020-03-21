export default interface LeadTracker {
  plays?: (PlaysEntity)[] | null;
}
export interface PlaysEntity {
  clock: string;
  leadTeamId: string;
  points: string;
}
