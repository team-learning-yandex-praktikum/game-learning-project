import type { Optional } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript'
import { Theme } from './theme.model'

export interface UserThemeAttributes {
    id: number
    themeId: number
    ownerId: number
}

export type UserThemeCreationAttributes = Optional<UserThemeAttributes, 'id'>

@Table({
    tableName: 'user_theme',
})
export class UserTheme extends Model<
    UserThemeAttributes,
    UserThemeCreationAttributes
> {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number

    @AllowNull(false)
    @ForeignKey(() => Theme)
    @Column({
        type: DataType.INTEGER,
        field: 'theme_id',
    })
    declare themeId: number

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'owner_id',
    })
    declare ownerId: string
}
