import { dbConnect } from './init'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createRouter } from './routes'
import cors, { type CorsOptions } from 'cors'
import { proxyResponseInterceptor } from './middlewares/proxy.interceptor'
import { authMiddleware } from './middlewares/auth.middleware'
import { joinURL } from './utils/joinURL'

dotenv.config()

const PORT = Number(process.env.SERVER_PORT) || 3001
const ROOT_PATH = process.env.SERVER_PATH ?? '/api'

const applyProxy = (app: Express) => {
    const {
        EXTERNAL_SERVER_URL,
        SERVER_URL = `http://localhost:${PORT}`,
        EXTERNAL_SERVER_PATH = '/ya',
    } = process.env
    const serverUrl = new URL(SERVER_URL)
    serverUrl.port = String(PORT)
    const route = joinURL(ROOT_PATH, EXTERNAL_SERVER_PATH)

    app.use(
        route,
        createProxyMiddleware({
            target: EXTERNAL_SERVER_URL,
            changeOrigin: true,
            cookieDomainRewrite: serverUrl.hostname,
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
    app.use(ROOT_PATH, router)

    return app
}

export const startApp = async () => {
    await dbConnect()

    const app = configureApp()

    app.listen(PORT, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
    })
}
