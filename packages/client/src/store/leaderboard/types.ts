import { LeaderboardTable } from '@api/leaderBoard/types'
import { LoadStatus } from '@store/enums'

export interface LeaderboardState {
    data: LeaderboardTable[]
    hasMoreData: boolean
    cursor: number
    status: LoadStatus
    error?: string | null
}
