import { TopicState } from './types'
import { LoadStatus } from '@utils/store/enums'

export const topicInitialState: TopicState = {
    status: LoadStatus.idle,
    error: null,
}
