import { TopicState } from './types'
import { LoadStatus } from '@store/enums'

export const topicInitialState: TopicState = {
    status: LoadStatus.idle,
    error: null,
}
