import DataBoxScore from "../types/data/BoxScore";
import Calendar from "../types/data/Calendar";
import Coaches from "../types/data/Coaches";
import LeadTracker from "../types/data/LeadTracker";
import DataPlayByPlay from "../types/data/PlayByPlay";
import PlayoffsBracket from "../types/data/PlayoffsBracket";
import PreviewArticle from "../types/data/PreviewArticle";
import RecapArticle from "../types/data/RecapArticle";
import Schedule from "../types/data/Schedule";
import DataScoreboard from "../types/data/Scoreboard";
import Standings from "../types/data/Standings";
import TeamLeaders from "../types/data/TeamLeaders";
import Teams from "../types/data/Teams";
import TeamSchedule from "../types/data/TeamSchedule";
import TeamStatsRankings from "../types/data/TeamStatsRankings";

import AssistTracker from "./stats/AssistTracker";
import StatsBoxScore from "./stats/BoxScore";
import BoxScoreSummary from "./stats/BoxScoreSummary";
import CommonTeamRoster from "./stats/CommonTeamRoster";
import HomepageV2 from "./stats/HomepageV2";
import LeagueGameLog from "./stats/LeagueGameLog";
import LeagueLeaders from "./stats/LeagueLeaders";
import LeagueStandings from "./stats/LeagueStandings";
import Lineups from "./stats/Lineups";
import StatsPlayByPlay from "./stats/PlayByPlay";
import PlayerClutch from "./stats/PlayerClutch";
import PlayerCompare from "./stats/PlayerCompare";
import PlayerHustle from "./stats/PlayerHustle";
import PlayerHustleLeaders from "./stats/PlayerHustleLeaders";
import PlayerInfo from "./stats/PlayerInfo";
import PlayerProfile from "./stats/PlayerProfile";
import PlayerShooting from "./stats/PlayerShooting";
import PlayersInfo from "./stats/PlayersInfo";
import PlayerSplits from "./stats/PlayerSplits";
import PlayerStats from "./stats/PlayerStats";
import PlayerTracking from "./stats/PlayerTracking";
import StatsScoreboard from "./stats/Scoreboard";
import Shots from "./stats/Shots";
import TeamClutch from "./stats/TeamClutch";
import TeamHistoricalLeaders from "./stats/TeamHistoricalLeaders";
import TeamHustle from "./stats/TeamHustle";
import TeamHustleLeaders from "./stats/TeamHustleLeaders";
import TeamInfoCommon from "./stats/TeamInfoCommon";
import TeamPlayerDashboard from "./stats/TeamPlayerDashboard";
import TeamPlayerOnOffDetails from "./stats/TeamPlayerOnOffDetails";
import TeamShooting from "./stats/TeamShooting";
import TeamSplits from "./stats/TeamSplits";
import TeamStats from "./stats/TeamStats";
import TeamYears from "./stats/TeamYears";

export interface NBA {
  players: Player[];
  teams: Team[];

  data: Data;
  stats: Stats;
  sportVu: SportVu;

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

type Dict<T> = { [key: string]: T }
type Primitive = string | number | boolean;
// adapted from built-in URL package internal types
type Query = string | null | Dict<string | string[]>

export type Transport = (url: string, query: Query, options?: Dict<unknown>) => Promise<any>

// note: gameId needs to be string because it has leading zeroes

export interface Data {
  scoreboard (date: LooseDate): Promise<DataScoreboard>
  boxScore (date: LooseDate, gameId: string): Promise<DataBoxScore>
  playByPlay (date: LooseDate, gameId: string): Promise<DataPlayByPlay>
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
  withTransport (transport: Transport): Data
}

// might figure out solution for strong types on params here but for now, loose.
export type Params = Dict<Primitive>

export interface Stats {
  playerProfile (params: Params): Promise<PlayerProfile>
  playerInfo (params: Params): Promise<PlayerInfo>
  playersInfo (params: Params): Promise<PlayersInfo>
  teamStats (params: Params): Promise<TeamStats>
  teamSplits (params: Params): Promise<TeamSplits>
  teamYears (params: Params): Promise<TeamYears>
  playerSplits (params: Params): Promise<PlayerSplits>
  shots (params: Params): Promise<Shots>
  scoreboard (params: Params): Promise<StatsScoreboard>
  boxScoreSummary (params: Params): Promise<BoxScoreSummary>
  boxScore (params: Params): Promise<StatsBoxScore>
  playByPlay (params: Params): Promise<StatsPlayByPlay>
  teamHistoricalLeaders (params: Params): Promise<TeamHistoricalLeaders>
  teamInfoCommon (params: Params): Promise<TeamInfoCommon>
  commonTeamRoster (params: Params): Promise<CommonTeamRoster>
  teamPlayerDashboard (params: Params): Promise<TeamPlayerDashboard>
  lineups (params: Params): Promise<Lineups>
  playerTracking (params: Params): Promise<PlayerTracking>
  homepageV2 (params: Params): Promise<HomepageV2>
  assistTracker (params: Params): Promise<AssistTracker>
  playerStats (params: Params): Promise<PlayerStats>
  playerClutch (params: Params): Promise<PlayerClutch>
  teamClutch (params: Params): Promise<TeamClutch>
  playerShooting (params: Params): Promise<PlayerShooting>
  teamShooting (params: Params): Promise<TeamShooting>
  leagueGameLog (params: Params): Promise<LeagueGameLog>
  leagueLeaders (params: Params): Promise<LeagueLeaders>
  leagueStandings (params: Params): Promise<LeagueStandings>
  playerHustleLeaders (params: Params): Promise<PlayerHustleLeaders>
  teamHustleLeaders (params: Params): Promise<TeamHustleLeaders>
  playerHustle (params: Params): Promise<PlayerHustle>
  teamHustle (params: Params): Promise<TeamHustle>
  teamPlayerOnOffDetails (params: Params): Promise<TeamPlayerOnOffDetails>
  playerCompare (params: Params): Promise<PlayerCompare>
  withTransport (transport: Transport): Stats;
}

// these are shipped with the library for backwards compatibility but the underlying APIs
// have been removed, so every method throws an error
export interface SportVu {
  speed (): Promise<never>
  touches (): Promise<never>
  passing (): Promise<never>
  defense (): Promise<never>
  rebounding (): Promise<never>
  drives (): Promise<never>
  shooting (): Promise<never>
  catchShoot (): Promise<never>
  pullUpShoot (): Promise<never>
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

declare namespace DataEndpointTypes {
  export {
    DataBoxScore as BoxScore,
    Calendar,
    Coaches,
    LeadTracker,
    DataPlayByPlay as PlayByPlay,
    PlayoffsBracket,
    PreviewArticle,
    RecapArticle,
    Schedule,
    DataScoreboard as Scoreboard,
    Standings,
    TeamLeaders,
    Teams,
    TeamSchedule,
    TeamStatsRankings,
  }
}

declare namespace StatsEndpointTypes {
  export {
    AssistTracker,
    StatsBoxScore as BoxScore,
    BoxScoreSummary,
    CommonTeamRoster,
    HomepageV2,
    LeagueGameLog,
    LeagueLeaders,
    LeagueStandings,
    Lineups,
    StatsPlayByPlay as PlayByPlay,
    PlayerClutch,
    PlayerCompare,
    PlayerHustle,
    PlayerHustleLeaders,
    PlayerInfo,
    PlayerProfile,
    PlayerShooting,
    PlayersInfo,
    PlayerSplits,
    PlayerStats,
    PlayerTracking,
    StatsScoreboard as Scoreboard,
    Shots,
    TeamClutch,
    TeamHistoricalLeaders,
    TeamHustle,
    TeamHustleLeaders,
    TeamInfoCommon,
    TeamPlayerDashboard,
    TeamPlayerOnOffDetails,
    TeamShooting,
    TeamSplits,
    TeamStats,
    TeamYears,
  }
}

export { StatsEndpointTypes, DataEndpointTypes }

declare const nba: NBA;
export default nba;
