import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from '@store/enums'
import { LeaderboardState } from './types'
import { getLeaderboard, saveRecord } from './thunks'

class LeaderboardAsyncCases {
    readonly builder: ActionReducerMapBuilder<LeaderboardState>

    constructor(builder: ActionReducerMapBuilder<LeaderboardState>) {
        this.builder = builder
    }

    private addCommonCase = <R, A>(
        thunk: AsyncThunk<R, A, AsyncThunkConfig>
    ) => {
        this.builder
            .addCase(thunk.pending, state => {
                state.status = LoadStatus.loading
            })
            .addCase(thunk.rejected, (state, action) => {
                state.status = LoadStatus.failed
                state.error = action.error.message
            })

        return this.builder
    }

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
