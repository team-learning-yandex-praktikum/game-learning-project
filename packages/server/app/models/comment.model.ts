import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import type { Optional } from 'sequelize'
import { Topic } from './topic.model'
import { COMMENT_LIMITS, USER_LOGIN_LIMITS } from '../validation/constants'

export interface CommentAttributes {
    id: number
    topicId: number
    comment: string
    createdBy: string
    parentId: number
}
export type CommentCreationAttributes = Optional<
    CommentAttributes,
    'id' | 'parentId'
>

@Table({
    tableName: 'comments',
})
export class Comment extends Model<
    CommentAttributes,
    CommentCreationAttributes
> {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number

    @ForeignKey(() => Topic)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare topicId: number

    @ForeignKey(() => Comment)
    @Column(DataType.INTEGER)
    declare parentId: number

    @Length({ max: COMMENT_LIMITS.max })
    @AllowNull(false)
    @Column(DataType.TEXT)
    declare comment: string

    @Length({ max: USER_LOGIN_LIMITS.max })
    @AllowNull(false)
    @Column(DataType.STRING(USER_LOGIN_LIMITS.max))
    declare createdBy: string

    @HasMany(() => Comment, 'parentId')
    declare replies: Comment[]
}
