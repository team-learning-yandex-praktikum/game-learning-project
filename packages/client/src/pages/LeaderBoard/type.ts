export interface PlayerInfo {
  position: number
  ratingFieldName: string
  limit: number
}

export enum SortRating {
  ascend = 'ascend',
  descend = 'descend',
}
