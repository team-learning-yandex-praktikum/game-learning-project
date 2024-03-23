import { createSlice } from '@reduxjs/toolkit'
import { userInitialState } from './initialState'
import { getExtraReducers } from '@store/user/extraReducers'

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {},
    selectors: {
        selectStatus: state => state.status,
        selectData: state => state.data,
        selectError: state => state.error,
    },
    extraReducers: getExtraReducers,
})

export const userReducer = userSlice.reducer
export const userSelectors = userSlice.selectors
export const userActions = userSlice.actions
