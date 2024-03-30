import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store'
import { ReactNode } from 'react'

export const withProviders = (component: ReactNode) => {
    const testStore = store

    return (
        <BrowserRouter>
            <Provider store={testStore}>{component}</Provider>
        </BrowserRouter>
    )
}
