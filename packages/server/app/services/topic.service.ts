import type { BaseService } from './base.service'
import {
    Topic,
    type TopicAttributes,
    type TopicCreationAttributes,
} from '../models/topic.model'

export type CreateRequest = TopicCreationAttributes

class TopicService implements BaseService {
    private repository = Topic

    public create = (creationData: CreateRequest) =>
        this.repository.create(creationData)

    public findById = (id: TopicAttributes['id']) =>
        this.repository.findByPk(id)

    public findByTitle = (title: TopicAttributes['title']) =>
        this.repository.findAll({
            where: { title: `%${title}%` },
        })
}

export const topicService = new TopicService()
