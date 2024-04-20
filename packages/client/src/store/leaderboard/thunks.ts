import { leaderboardApi } from '@api/leaderBoard'
import { teamName } from '@api/leaderBoard/constants'
import { LeaderBoardDTO, LeaderboardTableDTO } from '@api/leaderBoard/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getLeaderboard = createAsyncThunk(
    'leaderboard/getLeaderboard',
    async (data: LeaderboardTableDTO) => {
        const response = await leaderboardApi.getLeaderboard({
            ratingFieldName: teamName,
            limit: data.limit,
            cursor: data.cursor,
        })
        const result = response.map((item, index) => ({
            ...item.data,
        }))
        return result
    }
)

export const saveRecord = createAsyncThunk(
    'leaderboard/saveRecord',
    async (data: LeaderBoardDTO) => {
        leaderboardApi.saveRecord(data)
    }
)
