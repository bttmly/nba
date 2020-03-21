export default interface BoxScore {
  sports_content: SportsContent;
}
export interface SportsContent {
  sports_meta: SportsMeta;
  game: Game;
}
export interface SportsMeta {
  date_time: string;
  end_to_end_time_millis: string;
  consolidatedDomKey: string;
  season_meta: SeasonMeta;
  next: Next;
}
export interface SeasonMeta {
  calendar_date: string;
  season_year: string;
  stats_season_year: string;
  stats_season_id: string;
  stats_season_stage: string;
  roster_season_year: string;
  schedule_season_year: string;
  standings_season_year: string;
  season_id: string;
  display_year: string;
  display_season: string;
  season_stage: string;
  league_id: string;
}
export interface Next {
  url: string;
}
export interface Game {
  id: string;
  game_url: string;
  season_id: string;
  date: string;
  time: string;
  arena: string;
  city: string;
  state: string;
  country: string;
  home_start_date: string;
  home_start_time: string;
  visitor_start_date: string;
  visitor_start_time: string;
  previewAvailable: string;
  recapAvailable: string;
  notebookAvailable: string;
  tnt_ot: string;
  attendance: string;
  officials?: (OfficialsEntity)[] | null;
  ticket: Ticket;
  broadcasters: Broadcasters;
  period_time: PeriodTime;
  visitor: VisitorOrHome;
  home: VisitorOrHome;
  lp: Lp;
  dl: Dl;
}
export interface OfficialsEntity {
  person_id: string;
  first_name: string;
  last_name: string;
  jersey_number: string;
}
export interface Ticket {
  ticket_link: string;
}
export interface Broadcasters {
  tv: Tv;
}
export interface Tv {
  broadcaster?: (BroadcasterEntity)[] | null;
}
export interface BroadcasterEntity {
  scope: string;
  home_visitor: string;
  display_name: string;
}
export interface PeriodTime {
  period_value: string;
  period_status: string;
  game_status: string;
  game_clock: string;
  total_periods: string;
  period_name: string;
}
export interface VisitorOrHome {
  id: string;
  team_key: string;
  city: string;
  abbreviation: string;
  nickname: string;
  url_name: string;
  team_code: string;
  score: string;
  linescores: Linescores;
  Leaders: Leaders;
  stats: Stats;
  players: Players;
}
export interface Linescores {
  period?: (PeriodEntity)[] | null;
}
export interface PeriodEntity {
  period_value: string;
  period_name: string;
  score: string;
}
export interface Leaders {
  Points: PointsOrAssistsOrRebounds;
  Assists: PointsOrAssistsOrRebounds;
  Rebounds: PointsOrAssistsOrRebounds;
}
export interface PointsOrAssistsOrRebounds {
  PlayerCount: string;
  StatValue: string;
  leader?: (LeaderEntity)[] | null;
}
export interface LeaderEntity {
  PersonID: string;
  PlayerCode: string;
  FirstName: string;
  LastName: string;
}
export interface Stats {
  points: string;
  field_goals_made: string;
  field_goals_attempted: string;
  field_goals_percentage: string;
  free_throws_made: string;
  free_throws_attempted: string;
  free_throws_percentage: string;
  three_pointers_made: string;
  three_pointers_attempted: string;
  three_pointers_percentage: string;
  rebounds_offensive: string;
  rebounds_defensive: string;
  team_rebounds: string;
  assists: string;
  fouls: string;
  team_fouls: string;
  technical_fouls: string;
  steals: string;
  turnovers: string;
  team_turnovers: string;
  blocks: string;
  short_timeout_remaining: string;
  full_timeout_remaining: string;
}
export interface Players {
  player?: (PlayerEntity)[] | null;
}
export interface PlayerEntity {
  first_name: string;
  last_name: string;
  jersey_number: string;
  person_id: string;
  position_short: string;
  position_full: string;
  minutes: string;
  seconds: string;
  points: string;
  field_goals_made: string;
  field_goals_attempted: string;
  player_code: string;
  free_throws_made: string;
  free_throws_attempted: string;
  three_pointers_made: string;
  three_pointers_attempted: string;
  rebounds_offensive: string;
  rebounds_defensive: string;
  assists: string;
  fouls: string;
  steals: string;
  turnovers: string;
  team_turnovers: string;
  blocks: string;
  plus_minus: string;
  on_court: string;
  starting_position: string;
}
export interface Lp {
  lp_video: string;
  condensed_bb: string;
  visitor: VisitorOrHome1;
  home: VisitorOrHome1;
}
export interface VisitorOrHome1 {
  audio: Audio;
  video: Video;
}
export interface Audio {
  ENG: string;
  SPA: string;
}
export interface Video {
  avl: string;
  onAir: string;
  archBB: string;
}
export interface Dl {
  link?: (null)[] | null;
}
