import {
    AllowNull,
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
import { ERRORS } from '../error/constants'

export interface TopicAttributes {
    id: number
    title: string
    description: string
    userId: number
}
export type TopicCreationAttributes = Optional<
    TopicAttributes,
    'id' | 'description'
>

@Table({
    tableName: 'topics',
})
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
    @PrimaryKey
    @Column
    declare id: number

    @AllowNull(false)
    @Column(DataType.STRING(255))
    declare title: string

    @Length({ max: 1000, msg: ERRORS.maxLength })
    @Column(DataType.TEXT)
    declare description: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare userId: number

    @HasMany(() => Comment, 'topicId')
    declare comments: Comment[]
}
