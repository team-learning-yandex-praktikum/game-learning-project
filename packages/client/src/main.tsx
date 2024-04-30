import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store'
import { getWindow, isDev } from '@utils'

const initServiceWorkers = () => {
    const isAccessible = 'serviceWorker' in navigator && getWindow()

    if (!isAccessible || isDev()) {
        return
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then(registration => {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [
                        location.href,
                        ...performance
                            .getEntriesByType('resource')
                            .map(r => r.name),
                    ],
                }
                registration?.installing?.postMessage(data)
                console.log('Service worker registered: ', registration)
            })
            .catch(error => {
                console.error('Service worker registration failed: ', error)
            })
    })
}

initServiceWorkers()

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
