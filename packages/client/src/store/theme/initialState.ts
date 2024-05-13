import { ThemeState } from './types'
import { LoadStatus } from '@utils/store/enums'

export const themeInitialState: ThemeState = {
    data: [],
    status: LoadStatus.idle,
    error: null,
}
