import {
    AllowNull,
    Column,
    DataType,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript'

export interface CookieAttributes {
    userId: number
    cookie: string
}

export type CookieCreationAttributes = CookieAttributes

@Table({
    tableName: 'cookies',
})
export class Cookie extends Model<CookieAttributes, CookieCreationAttributes> {
    @Unique
    @AllowNull(false)
    @Column({ field: 'user_id' })
    declare userId: number

    @Unique
    @AllowNull(false)
    @Column(DataType.TEXT)
    declare cookie: string
}
