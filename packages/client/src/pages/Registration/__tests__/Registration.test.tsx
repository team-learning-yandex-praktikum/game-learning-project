import Registration from '../Registration'
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
    firstName: fieldsConfig.firstName.label,
    secondName: fieldsConfig.secondName.label,
    login: fieldsConfig.login.label,
    password: fieldsConfig.password.label,
    repeatedPassword: fieldsConfig.repeatPassword.label,
    email: fieldsConfig.email.label,
    phone: fieldsConfig.phone.label,
    submit: 'Сохранить',
    link: 'Вход',
}

const server = setupServer(requestHandlers.signup, requestHandlers.me)

const getFields = () => {
    const firstName = screen.getByLabelText(fieldLabels.firstName)
    const secondName = screen.getByLabelText(fieldLabels.secondName)
    const login = screen.getByLabelText(fieldLabels.login)
    const password = screen.getByLabelText(fieldLabels.password)
    const repeatedPassword = screen.getByLabelText(fieldLabels.repeatedPassword)
    const email = screen.getByLabelText(fieldLabels.email)
    const phone = screen.getByLabelText(fieldLabels.phone)

    return {
        firstName,
        secondName,
        login,
        password,
        repeatedPassword,
        email,
        phone,
    }
}

const fillFields = async () => {
    const {
        firstName,
        secondName,
        login,
        password,
        repeatedPassword,
        email,
        phone,
    } = getFields()

    await userEvent.type(firstName, userInfoStub.first_name)
    await userEvent.type(secondName, userInfoStub.second_name)
    await userEvent.type(login, userInfoStub.login)
    await userEvent.type(password, 'SomePass1234')
    await userEvent.type(repeatedPassword, 'SomePass1234')
    await userEvent.type(email, userInfoStub.email)
    await userEvent.type(phone, userInfoStub.phone)
}

describe('Registration', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const testedComponent = withProviders(<Registration />)

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

        const submitButton = screen.getByText(fieldLabels.submit)
        await fillFields()

        expect(submitButton).toBeEnabled()
    })

    test('submit should change state', async () => {
        render(testedComponent)

        const submitButton = screen.getByText(fieldLabels.submit)

        await fillFields()
        await userEvent.click(submitButton)

        const userState = store.getState().user

        expect(userState?.status).toBe(LoadStatus.complete)
        expect(userState?.data.id).toBe(userInfoStub.id)
    })
})
