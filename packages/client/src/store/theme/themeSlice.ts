import { createSlice } from '@reduxjs/toolkit'
import { themeInitialState } from '@store/theme/initialState'
import { getExtraReducers } from '@store/theme/extraReducers'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: themeInitialState,
    reducers: {},
    selectors: {
        selectStatus: state => state.status,
        selectThemes: state => state.data,
    },
    extraReducers: getExtraReducers,
})

export const themeReducer = themeSlice.reducer
export const themeSelectors = themeSlice.selectors
export const themeActions = themeSlice.actions
