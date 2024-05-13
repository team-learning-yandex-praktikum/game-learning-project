import { ThemeMode } from '@styles'
import { BaseState } from '@utils/store/types'

export interface Settings {
    themeMode: string | ThemeMode
}

export interface SettingsState extends BaseState {
    data: Settings
}
