import { LoadStatus } from '@store/enums'
import { Topic } from '@store/topic/types'

export type Topics = Omit<Topic, 'comments'>

export interface ForumState {
    topicsData: Topics[]
    status: LoadStatus
    error?: string | null
}
