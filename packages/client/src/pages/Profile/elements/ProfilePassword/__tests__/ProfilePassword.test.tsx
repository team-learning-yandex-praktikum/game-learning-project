import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { withProviders } from '../../../../../test-utils/render'
import { requestHandlers } from '../../../../../test-utils/requestHandlers'
import ProfilePassword from '../ProfilePassword'
import { fieldsConfig } from '@utils'
import userEvent from '@testing-library/user-event'
import { ERRORS } from '@utils/validation/errors'
import { store } from '@store'
import { LoadStatus } from '@store/enums'

const server = setupServer(requestHandlers.updatePassword)

const fieldLabels = {
    oldPassword: fieldsConfig.oldPassword.label,
    newPassword: fieldsConfig.newPassword.label,
    newPasswordRepeat: fieldsConfig.newPasswordRepeat.label,
    submit: 'Сохранить',
}

describe('Profile Password', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const testedComponent = withProviders(<ProfilePassword />)

    test('correctly rendered', () => {
        const { asFragment } = render(testedComponent)
        expect(asFragment()).toMatchSnapshot()
    })

    test('submit should be disabled', () => {
        render(testedComponent)
        const submitButton = screen.getByText(fieldLabels.submit)
        expect(submitButton).toBeDisabled()
    })

    test('submit should be enabled with correct values', async () => {
        render(testedComponent)

        const oldPassword = screen.getByLabelText(fieldLabels.oldPassword)
        const newPassword = screen.getByLabelText(fieldLabels.newPassword)
        const newPasswordRepeat = screen.getByLabelText(
            fieldLabels.newPasswordRepeat
        )
        const submitButton = screen.getByText(fieldLabels.submit)

        await userEvent.type(oldPassword, 'SomePass1234')
        await userEvent.type(newPassword, 'SomePass1111')
        await userEvent.type(newPasswordRepeat, 'SomePass1111')
        await userEvent.tab()

        expect(submitButton).toBeEnabled()
    })

    test('submit should change status', async () => {
        render(testedComponent)

        const oldPassword = screen.getByLabelText(fieldLabels.oldPassword)
        const newPassword = screen.getByLabelText(fieldLabels.newPassword)
        const newPasswordRepeat = screen.getByLabelText(
            fieldLabels.newPasswordRepeat
        )
        const submitButton = screen.getByText(fieldLabels.submit)

        expect(store.getState().user?.status).toBe(LoadStatus.idle)

        await userEvent.type(oldPassword, 'SomePass1234')
        await userEvent.type(newPassword, 'SomePass1111')
        await userEvent.type(newPasswordRepeat, 'SomePass1111')
        await userEvent.click(submitButton)

        expect(store.getState().user?.status).toBe(LoadStatus.complete)
    })

    test('submit should be disabled with same passwords', async () => {
        render(testedComponent)

        const oldPassword = screen.getByLabelText(fieldLabels.oldPassword)
        const newPassword = screen.getByLabelText(fieldLabels.newPassword)
        const newPasswordRepeat = screen.getByLabelText(
            fieldLabels.newPasswordRepeat
        )
        const submitButton = screen.getByText(fieldLabels.submit)

        await userEvent.type(oldPassword, 'SomePass1234')
        await userEvent.type(newPassword, 'SomePass1234')
        await userEvent.type(newPasswordRepeat, 'SomePass1234')
        await userEvent.tab()

        const error = await screen.findByText(ERRORS.equalsPassword)

        expect(submitButton).toBeDisabled()
        expect(error).toBeInTheDocument()
    })
})
