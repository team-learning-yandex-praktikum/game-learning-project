import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { settingsInitialState } from './initialState'
import { SettingsState } from '@store/settings/types'
import { ThemeMode } from '@styles'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: settingsInitialState,
    reducers: {
        setThemeMode: (
            state: SettingsState,
            action: PayloadAction<ThemeMode>
        ) => {
            state.data.themeMode = action.payload
        },
        toggleThemeMode: (state: SettingsState) => {
            state.data.themeMode =
                state.data.themeMode === ThemeMode.light
                    ? ThemeMode.dark
                    : ThemeMode.light
        },
    },
    selectors: {
        selectThemeMode: state => state.data.themeMode,
    },
})

export const settingsReducer = settingsSlice.reducer
export const settingsSelectors = settingsSlice.selectors
export const settingsActions = settingsSlice.actions
