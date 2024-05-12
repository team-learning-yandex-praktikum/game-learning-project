import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from './enums'
import { BaseState } from './types'

export class BaseAsyncCases<T extends BaseState> {
    readonly builder: ActionReducerMapBuilder<T>

    constructor(builder: ActionReducerMapBuilder<T>) {
        this.builder = builder
    }

    protected addCommonCase = <R, A>(
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
}
