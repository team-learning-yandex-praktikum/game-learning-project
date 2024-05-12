import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { applyModels } from '../models'
import type { SequelizeScopeError } from 'sequelize'
import { uploadEmojiToDB } from './upload/uploadEmoji'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'postgres',
}
const sequelize = new Sequelize(sequelizeOptions)

applyModels(sequelize)

export const dbConnect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error(
            'Unable to connect to the database:',
            (error as SequelizeScopeError).message
        )
    }

    await uploadEmojiToDB()
}
