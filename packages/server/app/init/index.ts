import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

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

export const dbConnect = async (): Promise<null> => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    return null
}
