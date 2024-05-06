import type { Optional } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Index,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript'

export interface ThemeAttributes {
    id: number
    theme: string
    description: string
}

export type ThemeCreationAttributes = Optional<
    ThemeAttributes,
    'id' | 'description'
>

@Table({
    tableName: 'themes',
})
export class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number

    @Index
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    declare theme: string

    @Column(DataType.TEXT)
    declare description: string
}
