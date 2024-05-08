import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import type { Optional } from 'sequelize'
import { Comment } from './comment.model'
import {
    TOPIC_DESCRIPTION_LIMITS,
    TOPIC_TITLE_LIMITS,
    USER_LOGIN_LIMITS,
} from '../validation/constants'
import { Reaction } from './reaction.model'

export interface TopicAttributes {
    id: number
    title: string
    description: string
    createdBy: string
}
export type TopicCreationAttributes = Optional<
    TopicAttributes,
    'id' | 'description'
>

@Table({
    tableName: 'topics',
})
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number

    @Length({ max: TOPIC_TITLE_LIMITS.max })
    @AllowNull(false)
    @Column(DataType.STRING(TOPIC_TITLE_LIMITS.max))
    declare title: string

    @Length({ max: TOPIC_DESCRIPTION_LIMITS.max })
    @Column(DataType.TEXT)
    declare description: string

    @Length({ max: USER_LOGIN_LIMITS.max })
    @AllowNull(false)
    @Column(DataType.STRING(USER_LOGIN_LIMITS.max))
    declare createdBy: string

    @HasMany(() => Comment, 'topicId')
    declare comments: Comment[]

    @HasMany(() => Reaction, 'topicId')
    declare reactions: Reaction[]
}
