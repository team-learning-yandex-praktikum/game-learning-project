import { BaseApi } from '@api/baseApi'
import { Topics } from '@store/forum/types'
import { Topic } from '@store/topic/types'
import { CreateTopicDTO, TopicsGetParams } from './types'

export class TopicsApi extends BaseApi {
    constructor() {
        super('topics', false)
    }

    getTopics = async (params: TopicsGetParams) => {
        const { data } = await this.client.get<Topics[]>(this.withUrl(), {
            params,
        })
        return data
    }

    getTopic = async (id: string) => {
        const { data } = await this.client.get<Topic>(this.withUrl(id))
        return data
    }

    createTopic = async (topicData: CreateTopicDTO) => {
        const { data } = await this.client.post<string>(
            this.withUrl(),
            topicData
        )
        return data
    }
}

export const topicsApi = new TopicsApi()
