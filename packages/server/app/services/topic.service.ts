import type { BaseService } from './base.service'
import {
    Topic,
    TopicAttributes,
    TopicCreationAttributes,
} from '../models/topic.model'
import type { GetRequestParams } from './types'
import { Op } from 'sequelize'

export type TopicCreateRequest = TopicCreationAttributes
export type TopicGetAllRequest = GetRequestParams & {
    title?: string
}

class TopicService implements BaseService {
    private repository = Topic

    public create = (creationData: TopicCreateRequest) =>
        this.repository.create(creationData)

    public findByParams = async ({
        limit = 20,
        offset = 0,
        title,
    }: TopicGetAllRequest) =>
        this.repository.findAll({
            limit,
            offset,
            ...(title
                ? {
                      where: {
                          title: {
                              [Op.iLike]: `%${title}%`,
                          },
                      },
                  }
                : {}),
        })

    public findById = (id: TopicAttributes['id']) =>
        this.repository.findByPk(id)

    public findCommentsByTopic = (topic: Topic) =>
        topic?.$get('comments', { limit: 20 })
}

export const topicService = new TopicService()
