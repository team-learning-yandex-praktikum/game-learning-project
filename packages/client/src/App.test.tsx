import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render } from '@testing-library/react'

// @ts-expect-error
global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
})
