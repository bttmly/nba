import BoxScore from "../types/data/BoxScore";
import Calendar from "../types/data/Calendar";
import Coaches from "../types/data/Coaches";
import LeadTracker from "../types/data/LeadTracker";
import PlayByPlay from "../types/data/PlayByPlay";
import PlayoffsBracket from "../types/data/PlayoffsBracket";
import PreviewArticle from "../types/data/PreviewArticle";
import RecapArticle from "../types/data/RecapArticle";
import Schedule from "../types/data/Schedule";
import Scoreboard from "../types/data/Scoreboard";
import Standings from "../types/data/Standings";
import TeamLeaders from "../types/data/TeamLeaders";
import Teams from "../types/data/Teams";
import TeamSchedule from "../types/data/TeamSchedule";
import TeamStatsRankings from "../types/data/TeamStatsRankings";

export interface NBA {
  players: Player[];
  teams: Team[];
  data: Data;

  teamIdFromName (name: string): number | null;
  playerIdFromName (name: string): number | null;
  findPlayer (query: string): Player | null;
  searchPlayers (query: string): Player[]

  updatePlayers(): Promise<Player[]>
  updateTeams(): Promise<Team[]>
}

// number here is YYYYMMDD like string
export type LooseDate = Date | string | number;
export type Numberish = string | number;

// note: gameId needs to be string because it has leading zeroes

export interface Data {
  scoreboard (date: LooseDate): Promise<Scoreboard>
  boxScore (date: LooseDate, gameId: string): Promise<BoxScore>
  playByPlay (date: LooseDate, gameId: string): Promise<PlayByPlay>
  schedule (season: Numberish): Promise<Schedule>
  teamSchedule (season: Numberish, teamId: Numberish): Promise<TeamSchedule>
  previewArticle (date: LooseDate, gameId: string): Promise<PreviewArticle>
  recapArticle (date: LooseDate, gameId: string): Promise<RecapArticle>
  leadTracker (date: LooseDate, gameId: string, period: Numberish): Promise<LeadTracker>
  playoffsBracket (season: Numberish): Promise<PlayoffsBracket>
  teamLeaders (season: Numberish, teamId: Numberish): Promise<TeamLeaders>
  teamStatsRankings (season: Numberish): Promise<TeamStatsRankings>
  coaches (season: Numberish): Promise<Coaches>
  teams (): Promise<Teams>
  calendar (): Promise<Calendar>
  standings (): Promise<Standings>
}

export interface Player {
  firstName: string;
  lastName: string;
  fullName: string;
  downcaseName: string;
  playerId: number;
  teamId: number;
}

export interface Team {
  teamId: number,
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
}

export {
  BoxScore,
  Calendar,
  Coaches,
  LeadTracker,
  PlayByPlay,
  PlayoffsBracket,
  PreviewArticle,
  RecapArticle,
  Schedule,
  Scoreboard,
  Standings,
  TeamLeaders,
  Teams,
  TeamSchedule,
  TeamStatsRankings,
}

declare const nba: NBA;
export default nba;
