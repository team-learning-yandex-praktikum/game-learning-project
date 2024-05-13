import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { LoadStatus } from '@utils/store/enums'
import { LeaderboardState } from './types'
import { getLeaderboard, saveRecord } from './thunks'
import { BaseAsyncCases } from '@utils/store/extraReducers'

class LeaderboardAsyncCases extends BaseAsyncCases<LeaderboardState> {
    fetchingLeaderboard = () => {
        this.addCommonCase(getLeaderboard).addCase(
            getLeaderboard.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                if (action.payload.length === 0) {
                    state.hasMoreData = false
                } else {
                    const data = [...state.data, ...action.payload]
                    const result = data.map((item, index) => ({
                        ...item,
                        position: index + 1,
                    }))
                    state.data = result
                }
            }
        )

        return this
    }

    saveNewRecord = () => {
        this.addCommonCase(saveRecord).addCase(saveRecord.fulfilled, state => {
            state.status = LoadStatus.complete
        })

        return this
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<LeaderboardState>
) => {
    new LeaderboardAsyncCases(builder).fetchingLeaderboard().saveNewRecord()
}
