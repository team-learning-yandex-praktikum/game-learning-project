import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { withProviders } from '../../../../../test-utils/render'
import {
    requestHandlers,
    userInfoStub,
} from '../../../../../test-utils/requestHandlers'
import ProfileInfo from '../ProfileInfo'
import { fieldsConfig, transformData } from '@utils'
import userEvent from '@testing-library/user-event'
import { store } from '@store'
import { userActions } from '@store/user'
import { LoadStatus } from '@utils/store/enums'

const server = setupServer(requestHandlers.updateProfile)

const fieldLabels = {
    login: fieldsConfig.login.label,
    displayName: fieldsConfig.displayName.label,
    firstName: fieldsConfig.firstName.label,
    secondName: fieldsConfig.secondName.label,
    email: fieldsConfig.email.label,
    phone: fieldsConfig.phone.label,
    changeButton: 'Изменить',
    cancel: 'Отменить',
    submit: 'Сохранить',
}

const getFields = () => {
    const login = screen.getByLabelText(fieldLabels.login)
    const displayName = screen.getByLabelText(fieldLabels.displayName)
    const firstName = screen.getByLabelText(fieldLabels.firstName)
    const secondName = screen.getByLabelText(fieldLabels.secondName)
    const email = screen.getByLabelText(fieldLabels.email)
    const phone = screen.getByLabelText(fieldLabels.phone)

    return {
        login,
        displayName,
        firstName,
        secondName,
        email,
        phone,
    }
}

describe('Profile Info', () => {
    beforeAll(() => server.listen())
    beforeEach(() => {
        store.dispatch(
            userActions.setData(transformData.from.dto(userInfoStub))
        )
    })
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const testedComponent = withProviders(<ProfileInfo />)

    test('correctly rendered', () => {
        const { asFragment } = render(testedComponent)
        expect(asFragment()).toMatchSnapshot()
    })

    test('form buttons shouldnt be in the doc', async () => {
        render(testedComponent)

        const submitButton = screen.queryByText(fieldLabels.submit)
        const cancel = screen.queryByText(fieldLabels.cancel)

        expect(submitButton).not.toBeInTheDocument()
        expect(cancel).not.toBeInTheDocument()
    })

    test('fields should be readonly', async () => {
        render(testedComponent)

        const { login, displayName, firstName, secondName, email, phone } =
            getFields()

        expect(login).toBeDisabled()
        expect(displayName).toBeDisabled()
        expect(firstName).toBeDisabled()
        expect(secondName).toBeDisabled()
        expect(email).toBeDisabled()
        expect(phone).toBeDisabled()
    })

    test('fields should be enabled after click on change', async () => {
        render(testedComponent)

        const { login, displayName, firstName, secondName, email, phone } =
            getFields()
        const changeButton = screen.getByText(fieldLabels.changeButton)

        await userEvent.click(changeButton)

        expect(login).toBeEnabled()
        expect(displayName).toBeEnabled()
        expect(firstName).toBeEnabled()
        expect(secondName).toBeEnabled()
        expect(email).toBeEnabled()
        expect(phone).toBeEnabled()
    })

    test('cancel should reset form', async () => {
        render(testedComponent)

        const { displayName, secondName } = getFields()
        const changeButton = screen.getByText(fieldLabels.changeButton)

        await userEvent.click(changeButton)
        await userEvent.clear(displayName)
        await userEvent.type(displayName, 'ivan_ivanov')
        await userEvent.clear(secondName)
        await userEvent.type(secondName, 'Попов')

        const cancel = screen.getByText(fieldLabels.cancel)

        expect(displayName).toHaveValue('ivan_ivanov')
        expect(secondName).toHaveValue('Попов')

        await userEvent.click(cancel)

        expect(displayName).toHaveValue('')
        expect(secondName).toHaveValue(userInfoStub.second_name)
        expect(displayName).toBeDisabled()
        expect(changeButton).toBeInTheDocument()
    })

    test('submit should change state', async () => {
        render(testedComponent)

        const { displayName, secondName } = getFields()
        const changeButton = screen.getByText(fieldLabels.changeButton)

        await userEvent.click(changeButton)
        await userEvent.clear(displayName)
        await userEvent.type(displayName, 'ivan_ivanov')
        await userEvent.clear(secondName)
        await userEvent.type(secondName, 'Попов')

        const submit = screen.getByText(fieldLabels.submit)

        expect(submit).toBeEnabled()
        await userEvent.click(submit)

        const userState = store.getState().user

        expect(submit).not.toBeInTheDocument()
        expect(userState?.status).toBe(LoadStatus.complete)
        expect(userState?.data.displayName).toBe('ivan_ivanov')
        expect(userState?.data.secondName).toBe('Попов')
    })
})
