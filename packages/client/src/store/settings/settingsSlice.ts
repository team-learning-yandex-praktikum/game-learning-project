import { createSlice } from '@reduxjs/toolkit'
import { settingsInitialState } from './initialState'
import { getExtraReducers } from '@store/settings/extraReducers'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: settingsInitialState,
    reducers: {},
    selectors: {
        selectThemeMode: state => state.data.themeMode,
    },
    extraReducers: getExtraReducers,
})

export const settingsReducer = settingsSlice.reducer
export const settingsSelectors = settingsSlice.selectors
export const settingsActions = settingsSlice.actions
