import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { SettingsState } from '@store/settings/types'
import { fetchUserTheme, postUserTheme } from '@store/settings/thunks'
import { LoadStatus } from '@utils/store/enums'
import { BaseAsyncCases } from '@utils/store/extraReducers'

class SettingsAsyncCases extends BaseAsyncCases<SettingsState> {
    fetchingTheme = () => {
        this.addCommonCase(fetchUserTheme).addCase(
            fetchUserTheme.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data.themeMode = action.payload.theme
            }
        )

        return this
    }

    postingUserTheme = () => {
        this.addCommonCase(postUserTheme).addCase(
            postUserTheme.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data.themeMode = action.payload.theme
            }
        )

        return this
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<SettingsState>
) => {
    new SettingsAsyncCases(builder).fetchingTheme().postingUserTheme()
}
