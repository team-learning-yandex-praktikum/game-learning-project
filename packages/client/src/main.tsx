import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

if ('serviceWorker' in navigator) {
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
