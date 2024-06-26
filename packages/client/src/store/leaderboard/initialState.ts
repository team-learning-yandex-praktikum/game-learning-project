import { LeaderboardState } from './types'
import { LoadStatus } from '@utils/store/enums'

export const leaderboardInitialState: LeaderboardState = {
    data: [],
    hasMoreData: true,
    cursor: 0,
    status: LoadStatus.idle,
    error: null,
}
