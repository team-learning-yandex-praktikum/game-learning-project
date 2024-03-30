import Login from '../Login'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { withProviders } from '../../../test-utils/render'
import { setupServer } from 'msw/node'
import { store } from '@store'
import { LoadStatus } from '@store/enums'
import {
    requestHandlers,
    userInfoStub,
} from '../../../test-utils/requestHandlers'
import { fieldsConfig } from '@utils'

const fieldLabels = {
    login: fieldsConfig.login.label,
    password: fieldsConfig.password.label,
    submit: 'Войти',
    link: 'Регистрация',
}

const server = setupServer(requestHandlers.signin, requestHandlers.me)

describe('Login', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const testedComponent = withProviders(<Login />)

    test('correctly rendered', async () => {
        const { asFragment } = render(testedComponent)

        expect(asFragment()).toMatchSnapshot()
    })

    test('submit should be disabled', () => {
        render(testedComponent)

        const submitButton = screen.getByText(fieldLabels.submit)

        expect(submitButton).toBeDisabled()
    })

    test('should be disabled without required field', async () => {
        render(testedComponent)

        const login = screen.getByLabelText(fieldLabels.login)
        const submitButton = screen.getByText(fieldLabels.submit)

        await userEvent.type(login, userInfoStub.login)

        expect(submitButton).toBeDisabled()
    })

    test('submit should be enabled with correct values', async () => {
        render(testedComponent)

        const login = screen.getByLabelText(fieldLabels.login)
        const password = screen.getByLabelText(fieldLabels.password)
        const submitButton = screen.getByText(fieldLabels.submit)

        await userEvent.type(login, 'ivan')
        await userEvent.type(password, 'SomePass1234')

        expect(submitButton).toBeEnabled()
    })

    test('submit should change state', async () => {
        render(testedComponent)

        const login = screen.getByLabelText(fieldLabels.login)
        const password = screen.getByLabelText(fieldLabels.password)
        const submitButton = screen.getByText(fieldLabels.submit)

        await userEvent.type(login, 'ivan')
        await userEvent.type(password, 'SomePass1234')
        await userEvent.click(submitButton)

        const userState = store.getState().user

        expect(userState?.status).toBe(LoadStatus.complete)
        expect(userState?.data.id).toBe(userInfoStub.id)
    })
})
