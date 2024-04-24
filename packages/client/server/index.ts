import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'
import { RenderAndTemplate } from './types'

dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_PATH = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

const getViteServer = async (app: Express) => {
    if (!isDev) {
        app.use(
            express.static(path.join(CLIENT_PATH, 'dist/client'), {
                index: false,
            })
        )

        return undefined
    }

    const viteServer = await createViteServer({
        server: { middlewareMode: true },
        root: CLIENT_PATH,
        appType: 'custom',
    })

    app.use(viteServer.middlewares)

    return viteServer
}

const getRenderAndTemplate = async (
    url: string,
    vite?: ViteDevServer
): Promise<RenderAndTemplate> => {
    if (vite) {
        const template = await fs.readFile(
            path.resolve(CLIENT_PATH, 'index.html'),
            'utf-8'
        )
        const transformedTemplate = await vite.transformIndexHtml(url, template)
        const render = (
            await vite.ssrLoadModule(
                path.join(CLIENT_PATH, 'src/entry-server.tsx')
            )
        ).render

        return { template: transformedTemplate, render }
    }

    const template = await fs.readFile(
        path.join(CLIENT_PATH, 'dist/client/index.html'),
        'utf-8'
    )
    const pathToServer = path.join(CLIENT_PATH, 'dist/server/entry-server.js')
    const render = (await import(pathToServer)).render

    return { template, render }
}

async function createServer() {
    const app = express()
    const vite: ViteDevServer | undefined = await getViteServer(app)

    app.use(cookieParser())
    app.get('/', async (req: Request, res: Response, next: NextFunction) => {
        const url = req.originalUrl

        try {
            const { render, template } = await getRenderAndTemplate(url, vite)
            const { html: appHtml, initialState } = await render(req)
            const serializedInitialState = serialize(initialState, {
                isJSON: true,
            })

            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '<!--ssr-initial-state-->',
                    `<script>window.initialState = ${serializedInitialState}</script>`
                )

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite?.ssrFixStacktrace(e as Error)
            next(e)
        }
    })

    return app
}

const startServer = async () => {
    const app = await createServer()

    app.listen(PORT, () => {
        console.log(`Client is listening on port: ${PORT}`)
    })
}

startServer()
