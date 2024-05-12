import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { ThemeState } from '@store/theme/types'
import { LoadStatus } from '@utils/store/enums'
import { fetchThemes } from '@store/theme/thunks'
import { BaseAsyncCases } from '@utils/store/extraReducers'

class ThemeAsyncCases extends BaseAsyncCases<ThemeState> {
    fetchingTheme = () => {
        this.addCommonCase(fetchThemes).addCase(
            fetchThemes.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data = action.payload
            }
        )
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<ThemeState>
) => {
    new ThemeAsyncCases(builder).fetchingTheme()
}
