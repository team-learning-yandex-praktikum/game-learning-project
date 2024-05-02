import { ForumState } from './types'
import { LoadStatus } from '@store/enums'

export const forumInitialState: ForumState = {
    topicsData: [],
    status: LoadStatus.idle,
    error: null,
}
