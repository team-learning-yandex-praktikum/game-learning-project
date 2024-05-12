import { ThemeDTO } from '@api/theme/types'
import { BaseState } from '@utils/store/types'

export type Theme = ThemeDTO

export interface ThemeState extends BaseState {
    data: Theme[]
}
