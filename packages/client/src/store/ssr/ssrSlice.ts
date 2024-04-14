import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ssrInitialState } from './initialState'

export const ssrSlice = createSlice({
    name: 'ssr',
    initialState: ssrInitialState,
    reducers: {
        setPageHasBeenInitializedOnServer: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.pageHasBeenInitializedOnServer = payload
        },
    },
    selectors: {
        selectPageHasBeenInitializedOnServer: state =>
            state.pageHasBeenInitializedOnServer,
    },
})

export const ssrReducer = ssrSlice.reducer
export const ssrSelectors = ssrSlice.selectors
export const ssrActions = ssrSlice.actions
