import { dbConnect } from './init'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import { createRouter } from './routes'

dotenv.config()

const PORT = Number(process.env.SERVER_PORT) || 3001

const applyProxy = (app: Express) => {
    const {
        EXTERNAL_SERVER_URL,
        SERVER_URL = `http://localhost:${PORT}`,
        EXTERNAL_SERVER_PATH = '/ya',
    } = process.env
    const { hostname } = new URL(SERVER_URL)

    app.use(
        EXTERNAL_SERVER_PATH,
        createProxyMiddleware({
            target: EXTERNAL_SERVER_URL,
            changeOrigin: true,
            cookieDomainRewrite: hostname,
        })
    )
}

const configureApp = () => {
    const app = express()
    const router = createRouter()

    app.disable('x-powered-by')
    app.use(cors())
    app.use(cookieParser())
    app.use(router)

    applyProxy(app)

    return app
}

export const startApp = async () => {
    await dbConnect()
    const app = configureApp()

    app.listen(PORT, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
    })
}
