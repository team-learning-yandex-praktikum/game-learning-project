import { SettingsState } from '@store/settings/types'
import { LoadStatus } from '@store/enums'
import { ThemeMode } from '@styles'

export const settingsInitialState: SettingsState = {
    data: {
        themeMode: ThemeMode.light,
    },
    status: LoadStatus.idle,
    error: null,
}
