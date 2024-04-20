import { teamName } from './constants'

export interface GameData {
    user_id?: number
    user_name?: string
    [teamName]: number
}

export interface LeaderboardTable extends GameData {
    position: number
}

export interface LeaderBoardDTO {
    data: GameData
    teamName: string
    ratingFieldName: string
}

export interface LeaderboardTableDTO {
    ratingFieldName: string
    cursor: number
    limit: number
}

export interface LeaderboardTableResponse {
    data: GameData
}
