import { createAsyncThunk } from '@reduxjs/toolkit'
import { userThemeApi } from '@api/userTheme'
import { RootState } from '@store'
import { ThemeMode } from '@styles'

export const postUserTheme = createAsyncThunk(
    'settings/setUserTheme',
    async (theme: string, { getState }) => {
        const state = getState() as RootState
        const userId = state.user.data.id

        if (!userId) {
            throw new Error('User Id is not exist')
        }

        return await userThemeApi.setTheme(userId, theme)
    }
)

const reverseThemeValue = (theme: string | ThemeMode) =>
    theme === ThemeMode.light ? ThemeMode.dark : ThemeMode.light

export const toggleUserTheme = createAsyncThunk(
    'settings/toggleUserTheme',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState
        const currentTheme = state.settings.data.themeMode
        const targetTheme = reverseThemeValue(currentTheme)

        dispatch(postUserTheme(targetTheme))
    }
)

export const fetchUserTheme = createAsyncThunk(
    'settings/fetchTheme',
    async (_, { getState }) => {
        const state = getState() as RootState
        const userId = state.user.data.id

        if (!userId) {
            throw new Error('User Id is not exist')
        }

        return await userThemeApi.getTheme(userId)
    }
)
