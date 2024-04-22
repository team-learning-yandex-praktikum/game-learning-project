import { BaseApi } from '@api/baseApi'
import {
    LeaderBoardDTO,
    LeaderboardTableDTO,
    LeaderboardTableResponse,
} from './types'

export class LeaderBoardApi extends BaseApi {
    constructor() {
        super('leaderboard')
    }

    saveRecord = async (leaderboardData: LeaderBoardDTO) => {
        const { data } = await this.client.post<string>(
            this.withUrl(''),
            leaderboardData
        )
        return data
    }

    getLeaderboard = async (leaderboardData: LeaderboardTableDTO) => {
        const { data } = await this.client.post<LeaderboardTableResponse[]>(
            this.withUrl('all'),
            leaderboardData
        )
        return data
    }
}

export const leaderboardApi = new LeaderBoardApi()
