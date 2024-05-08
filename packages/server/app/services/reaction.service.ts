import { Op } from 'sequelize'
import {
    Reaction,
    ReactionAttributes,
    type ReactionCreationAttributes,
} from '../models/reaction.model'
import type { BaseService } from './base.service'
import { groupBy } from '../utils/ArrayFunc'
import { Emoji } from '../models/emoji.model'

export type CreateRequest = ReactionCreationAttributes

class ReactionService implements BaseService {
    private repository = Reaction

    private readonly timestampField = 'createdAt'
    private readonly attrGet = ['id', 'emojiId', 'topicId', 'userId']

    public async create(req: CreateRequest) {
        return this.repository.create(req)
    }

    public async addOrUpdate(req: CreateRequest) {
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

    public async getByTopics(topicIdArray: number[]) {
        const reactions = await this.repository.findAll({
            where: {
                topicId: { [Op.in]: topicIdArray },
            },
            attributes: this.attrGet,
            order: [[this.timestampField, 'DESC']],
        })
        const arrayDto = reactions.map(toDto)
        return groupBy(arrayDto, dto => dto.topicId)
    }

    public async getById(id: ReactionAttributes['id']) {
        return this.repository.findByPk(id)
    }

    public async getEmoticons(category?: string): Promise<EmojiDto[]> {
        const records = await (category
            ? Emoji.findAll({
                  where: { category: category },
              })
            : Emoji.findAll())

        return records.map(r => ({
            id: r.id,
            char: r.char,
            code: r.code,
            category: r.category,
        }))
    }
}

export type EmojiDto = {
    id: number
    char: string
    code: string
    category: string
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
