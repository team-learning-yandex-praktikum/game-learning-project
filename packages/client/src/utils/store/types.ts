import { LoadStatus } from './enums'

export interface BaseState {
    status: LoadStatus
    error?: string | null
}
