import { dbConnect } from './init'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createRouter } from './routes'
import cors, { type CorsOptions } from 'cors'
import { proxyResponseInterceptor } from './middlewares/proxy.interceptor'
import { authMiddleware } from './middlewares/auth.middleware'

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
            selfHandleResponse: true,
            on: {
                proxyRes: proxyResponseInterceptor,
            },
        })
    )
}

const applyCors = (app: Express) => {
    const { CLIENT_URL = 'http://localhost:3000' } = process.env

    const corsOptions: CorsOptions = {
        credentials: true,
        origin: CLIENT_URL,
    }

    app.use(cors(corsOptions))
}

const configureApp = () => {
    const app = express()
    const router = createRouter()

    app.disable('x-powered-by')
    app.use(cookieParser())
    applyProxy(app)
    applyCors(app)
    app.use(authMiddleware)
    app.use(express.json())
    app.use(router)

    return app
}

export const startApp = async () => {
    await dbConnect()

    const app = configureApp()

    app.listen(PORT, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
    })
}
