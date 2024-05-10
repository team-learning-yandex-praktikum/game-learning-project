import { Op } from 'sequelize'
import {
    Reaction,
    ReactionAttributes,
    type ReactionCreationAttributes,
} from '../models/reaction.model'
import type { BaseService } from './base.service'
import { groupBy } from '../utils/ArrayFunc'

export type ReactionCreateRequest = ReactionCreationAttributes

class ReactionService implements BaseService {
    private repository = Reaction

    private readonly timestampField = 'createdAt'
    private readonly attrGet = ['id', 'emojiId', 'topicId', 'userId']

    public async create(req: ReactionCreateRequest) {
        return this.repository.create(req)
    }

    public async addOrUpdate(req: ReactionCreateRequest) {
        const [found, created] = await this.repository.findOrCreate({
            where: {
                topicId: req.topicId,
                userId: req.userId,
            },
            defaults: req,
        })

        if (!created) {
            found.emojiId = req.emojiId
            await found.save()
        }

        return found
    }

    public async getByTopic(topicId: number) {
        const reactions = await this.repository.findAll({
            where: {
                topicId: topicId,
            },
            attributes: this.attrGet,
            order: [[this.timestampField, 'DESC']],
        })
        return reactions.map(toDto)
    }

    public async getByTopics(topicIdArray: string[]) {
        const reactions = await this.repository.findAll({
            where: {
                topicId: { [Op.in]: topicIdArray },
            },
            attributes: this.attrGet,
            order: [[this.timestampField, 'DESC']],
        })
        const arrayDto = reactions.map(toDto)
        return Object.fromEntries(groupBy(arrayDto, dto => dto.topicId))
    }

    public async getById(id: ReactionAttributes['id']) {
        return this.repository.findByPk(id)
    }
}

export type ReactionDto = {
    id: number
    topicId: number
    emojiId: number
    userId: number
}

function toDto(model: Reaction): ReactionDto {
    return {
        id: model.id,
        topicId: model.topicId,
        emojiId: model.emojiId,
        userId: model.userId,
    }
}

export const reactionService = new ReactionService()
