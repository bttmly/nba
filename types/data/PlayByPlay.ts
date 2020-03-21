export default interface PlayByPlay {
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
}
