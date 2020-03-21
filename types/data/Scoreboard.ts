export default interface Scoreboard {
  sports_content: SportsContent;
}
export interface SportsContent {
  sports_meta: SportsMeta;
  games: Games;
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
export interface Games {
  game?: (GameEntity)[] | null;
}
export interface GameEntity {
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
  buzzerBeater: string;
  ticket: Ticket;
  period_time: PeriodTime;
  lp: Lp;
  dl: Dl;
  broadcasters: Broadcasters;
  visitor: VisitorOrHome;
  home: VisitorOrHome;
}
export interface Ticket {
  ticket_link: string;
}
export interface PeriodTime {
  period_value: string;
  period_status: string;
  game_status: string;
  game_clock: string;
  total_periods: string;
  period_name: string;
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
export interface Broadcasters {
  tv: TvOrRadio;
  radio?: TvOrRadio1 | null;
}
export interface TvOrRadio {
  broadcaster?: (BroadcasterEntity)[] | null;
}
export interface BroadcasterEntity {
  scope: string;
  home_visitor: string;
  display_name: string;
}
export interface TvOrRadio1 {
  broadcaster?: (BroadcasterEntity)[] | null;
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
}
export interface Linescores {
  period?: (PeriodEntity)[] | null;
}
export interface PeriodEntity {
  period_value: string;
  period_name: string;
  score: string;
}
