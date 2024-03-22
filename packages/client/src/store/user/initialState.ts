import { UserState } from './types'
import { LoadStatus } from '@store/enums'

export const userInitialState: UserState = {
    data: {},
    status: LoadStatus.idle,
    error: null,
}
