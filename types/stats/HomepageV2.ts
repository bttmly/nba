export default interface HomepageV2 {
  homePageStat1?: (HomePageStat1Entity)[] | null;
  homePageStat2?: (HomePageStat2Entity)[] | null;
  homePageStat3?: (HomePageStat3Entity)[] | null;
  homePageStat4?: (HomePageStat4Entity)[] | null;
  homePageStat5?: (HomePageStat5Entity)[] | null;
  homePageStat6?: (HomePageStat6Entity)[] | null;
  homePageStat7?: (HomePageStat7Entity)[] | null;
  homePageStat8?: (HomePageStat8Entity)[] | null;
}
export interface HomePageStat1Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  pts: number;
}
export interface HomePageStat2Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  reb: number;
}
export interface HomePageStat3Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  ast: number;
}
export interface HomePageStat4Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  stl: number;
}
export interface HomePageStat5Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  fgPct: number;
}
export interface HomePageStat6Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  ftPct: number;
}
export interface HomePageStat7Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  fg3Pct: number;
}
export interface HomePageStat8Entity {
  rank: number;
  playerId: number;
  player: string;
  teamId: number;
  teamAbbreviation: string;
  teamName: string;
  jerseyNum: string;
  playerPosition: string;
  blk: number;
}
