import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { store } from '@store'
import { Provider } from 'react-redux'

export const render = (url: string) =>
    renderToString(
        <StaticRouter location={url}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    )
