import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileExit from '../ProfileExit'
import { withProviders } from '../../../../../test-utils/render'
import userEvent from '@testing-library/user-event'
import { requestHandlers } from '../../../../../test-utils/requestHandlers'
import { store } from '@store'
import { LoadStatus } from '@store/enums'

const server = setupServer(requestHandlers.logout)

describe('Profile Exit', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('correctly rendered', () => {
        const { asFragment } = render(withProviders(<ProfileExit />))
        expect(asFragment()).toMatchSnapshot()
    })

    test('should change state after exit', async () => {
        render(withProviders(<ProfileExit />))
        const exitButton = screen.getByText('Да')

        await userEvent.click(exitButton)

        const userState = store.getState().user

        expect(userState?.data).toStrictEqual({})
        expect(userState?.status).toBe(LoadStatus.complete)
    })
})
