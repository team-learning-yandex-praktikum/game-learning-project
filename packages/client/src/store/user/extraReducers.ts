import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { UserState } from './types'
import {
    fetchUserAvatar,
    fetchUserData,
    login,
    logout,
    oAuthLogin,
    registration,
    updatePassword,
    updateUserAvatar,
    updateUserData,
} from './thunks'
import { BaseAsyncCases } from '@utils/store/extraReducers'
import { LoadStatus } from '@utils/store/enums'

class UserAsyncCases extends BaseAsyncCases<UserState> {
    fetchingUser = () => {
        this.addCommonCase(fetchUserData).addCase(
            fetchUserData.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data = action.payload
            }
        )

        return this
    }

    updatingUser = () => {
        this.addCommonCase(updateUserData).addCase(
            updateUserData.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data = action.payload
            }
        )

        return this
    }

    updatingPassword = () => {
        this.addCommonCase(updatePassword).addCase(
            updatePassword.fulfilled,
            state => {
                state.status = LoadStatus.complete
            }
        )

        return this
    }

    fetchingAvatar = () => {
        this.addCommonCase(fetchUserAvatar).addCase(
            fetchUserAvatar.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data.avatarImage = action.payload
            }
        )

        return this
    }

    updatingAvatar = () => {
        this.addCommonCase(updateUserAvatar).addCase(
            updateUserAvatar.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.data = action.payload
            }
        )

        return this
    }

    login = () => {
        this.addCommonCase(login)

        return this
    }

    oAuthLogin = () => {
        this.addCommonCase(oAuthLogin)

        return this
    }

    registration = () => {
        this.addCommonCase(registration)

        return this
    }

    logout = () => {
        this.addCommonCase(logout).addCase(logout.fulfilled, state => {
            state.status = LoadStatus.complete
            state.data = {}
        })

        return this
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<UserState>
) => {
    new UserAsyncCases(builder)
        .fetchingUser()
        .updatingUser()
        .updatingPassword()
        .fetchingAvatar()
        .updatingAvatar()
        .logout()
        .login()
        .registration()
        .oAuthLogin()
}
