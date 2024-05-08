import type { Optional } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

export type EmojiAttributes = {
    id: number
    char: string
    code: string
    name: string
    category: string
}

export type EmojiCreationAttributes = Optional<EmojiAttributes, 'id'>

@Table({
    timestamps: false,
    paranoid: false,
    tableName: 'emoji',
})
export class Emoji extends Model<EmojiAttributes, EmojiCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
        field: 'unicode_char',
    })
    declare char: string

    @AllowNull(false)
    @Length({ max: 20, min: 5 })
    @Column({
        type: DataType.TEXT,
        field: 'unicode_hexcode',
    })
    declare code: string

    @AllowNull(false)
    @Length({ max: 80 })
    @Column({
        type: DataType.TEXT,
        field: 'unicode_name',
    })
    declare name: string

    @AllowNull(false)
    @Length({ max: 16, min: 3 })
    @Column({
        type: DataType.TEXT,
        field: 'category',
    })
    declare category: string
}
