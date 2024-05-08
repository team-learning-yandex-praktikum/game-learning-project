import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { Topic } from './topic.model'
import { Emoji } from './emoji.model'
import type { Optional } from 'sequelize'

export type ReactionAttributes = {
    id: number
    topicId: number
    userId: number
    emojiId: number
}

export type ReactionCreationAttributes = Optional<ReactionAttributes, 'id'>

@Table({
    timestamps: true,
    paranoid: false,
    tableName: 'reactions_on_topics',
})
export class Reaction extends Model<
    ReactionAttributes,
    ReactionCreationAttributes
> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        field: 'id',
    })
    declare id: number

    @ForeignKey(() => Topic)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'topic_id',
    })
    declare topicId: number

    // @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'reaction_user_id',
    })
    declare userId: number

    @ForeignKey(() => Emoji)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'emoji_id',
    })
    declare emojiId: number
}
