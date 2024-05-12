import { createAsyncThunk } from '@reduxjs/toolkit'
import { themeApi } from '@api'
import { fetchUserTheme, postUserTheme } from '@store/settings/thunks'
import { AxiosError } from 'axios'
import { RootState } from '@store'

export const fetchThemes = createAsyncThunk(
    'theme/fetch',
    async (_, { dispatch, getState }) => {
        const response = await themeApi.getThemes()

        try {
            await dispatch(fetchUserTheme()).unwrap()
        } catch (e) {
            const error = e as AxiosError
            console.log(error)
            if (error.message === 'Request failed with status code 404') {
                const defaultTheme = (getState() as RootState).settings.data
                    .themeMode

                dispatch(postUserTheme(defaultTheme))
            }
        }

        return response
    }
)
