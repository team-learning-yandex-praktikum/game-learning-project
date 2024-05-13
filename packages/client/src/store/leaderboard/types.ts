import { LeaderboardTable } from '@api/leaderBoard/types'
import { BaseState } from '@utils/store/types'

export interface LeaderboardState extends BaseState {
    data: LeaderboardTable[]
    hasMoreData: boolean
    cursor: number
}
