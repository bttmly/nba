export default interface TeamInfoCommon {
  teamInfoCommon?: (TeamInfoCommonEntity)[] | null;
  teamSeasonRanks?: (TeamSeasonRanksEntity)[] | null;
  availableSeasons?: (AvailableSeasonsEntity)[] | null;
}
export interface TeamInfoCommonEntity {
  teamId: number;
  seasonYear: string;
  teamCity: string;
  teamName: string;
  teamAbbreviation: string;
  teamConference: string;
  teamDivision: string;
  teamCode: string;
  w: number;
  l: number;
  pct: number;
  confRank: number;
  divRank: number;
  minYear: string;
  maxYear: string;
}
export interface TeamSeasonRanksEntity {
  leagueId: string;
  seasonId: string;
  teamId: number;
  ptsRank: number;
  ptsPg: number;
  rebRank: number;
  rebPg: number;
  astRank: number;
  astPg: number;
  oppPtsRank: number;
  oppPtsPg: number;
}
export interface AvailableSeasonsEntity {
  seasonId: string;
}
