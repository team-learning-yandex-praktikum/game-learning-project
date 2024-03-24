import { LoadStatus } from '@store/enums'
import { ThemeMode } from '@styles'

export interface Settings {
    themeMode: ThemeMode
}

export interface SettingsState {
    data: Settings
    status: LoadStatus
    error?: string | null
}
