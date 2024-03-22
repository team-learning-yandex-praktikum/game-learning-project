import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@store'

// @ts-expect-error
global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve('hey') })
)

const testStore = store

test('Example test', async () => {
    render(
        <BrowserRouter>
            <Provider store={testStore}>
                <App />
            </Provider>
        </BrowserRouter>
    )
})
