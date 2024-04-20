import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import {
    LoaderFunctionArgs,
    LoaderFunctionContextOptions,
    routesConfig,
} from '@routes'
import { createStore } from '@store/store'
import { Request as ExpressRequest } from 'express'
import { matchRoutes } from 'react-router'
import { ssrActions } from '@store/ssr'

export const createUrl = (req: ExpressRequest) => {
    const origin = `${req.protocol}://${req.get('host')}`

    return new URL(req.originalUrl || req.url, origin)
}

export const createContext = (
    req: ExpressRequest
): LoaderFunctionContextOptions => ({
    clientToken: req.cookies.token,
})

export const render = async (req: ExpressRequest) => {
    const url = createUrl(req)
    const foundRoutes = matchRoutes(routesConfig, url)
    const [{ route }] = foundRoutes ?? [{}]

    const store = createStore()

    store.dispatch(ssrActions.setPageHasBeenInitializedOnServer(true))

    const loaderContext = {
        context: {
            dispatch: store.dispatch,
            state: store.getState(),
            options: createContext(req),
        },
    } as LoaderFunctionArgs

    await route?.loader?.(loaderContext)

    const html = renderToString(
        <StaticRouter location={url}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    )

    return { html, initialState: store.getState() }
}
