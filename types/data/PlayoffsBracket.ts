export default interface PlayoffsBracket {
  series?: (SeriesEntity)[] | null;
}
export interface SeriesEntity {
  roundNum: string;
  confName: string;
  seriesId: string;
  isScheduleAvailable: boolean;
  isSeriesCompleted: boolean;
  summaryStatusText: string;
  gameNumber: number;
  isGameLive: boolean;
  topRow: TopRowOrBottomRow;
  bottomRow: TopRowOrBottomRow;
}
export interface TopRowOrBottomRow {
  teamId: string;
  seedNum: string;
  wins: string;
  isSeriesWinner: boolean;
}
