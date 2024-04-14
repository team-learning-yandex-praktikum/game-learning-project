import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'

dotenv.config()

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

type RenderResult = {
    html: string
    initialState: unknown
}
type RenderFn = (req: Request) => Promise<RenderResult>

async function createServer() {
    const app = express()

    app.use(cookieParser())

    let vite: ViteDevServer | undefined

    if (isDev) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom',
        })

        app.use(vite.middlewares)
    } else {
        app.use(
            express.static(path.join(clientPath, 'dist/client'), {
                index: false,
            })
        )
    }

    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
        const url = req.originalUrl

        try {
            let render: RenderFn
            let template: string

            if (vite) {
                template = await fs.readFile(
                    path.resolve(clientPath, 'index.html'),
                    'utf-8'
                )

                template = await vite.transformIndexHtml(url, template)

                render = (
                    await vite.ssrLoadModule(
                        path.join(clientPath, 'src/entry-server.tsx')
                    )
                ).render
            } else {
                template = await fs.readFile(
                    path.join(clientPath, 'dist/client/index.html'),
                    'utf-8'
                )

                const pathToServer = path.join(
                    clientPath,
                    'dist/server/entry-server.js'
                )

                render = (await import(pathToServer)).render
            }

            const { html: appHtml, initialState } = await render(req)

            const html = template.replace('<!--ssr-outlet-->', appHtml).replace(
                '<!--ssr-initial-state-->',
                `<script>window.initialState = ${serialize(initialState, {
                    isJSON: true,
                })}</script>`
            )

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite?.ssrFixStacktrace(e as Error)
            next(e)
        }
    })

    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`)
    })
}

createServer()
