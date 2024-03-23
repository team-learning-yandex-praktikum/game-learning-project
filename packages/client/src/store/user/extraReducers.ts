import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { UserState } from '@store/user/types'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from '@store/enums'
import {
    fetchUserAvatar,
    fetchUserData,
    login,
    logout,
    registration,
    updatePassword,
    updateUserAvatar,
    updateUserData,
} from '@store/user/thunks'

class UserAsyncCases {
    readonly builder: ActionReducerMapBuilder<UserState>

    constructor(builder: ActionReducerMapBuilder<UserState>) {
        this.builder = builder
    }

    private addCommonCase = <R, A>(
        thunk: AsyncThunk<R, A, AsyncThunkConfig>
    ) => {
        this.builder
            .addCase(thunk.pending, state => {
                state.status = LoadStatus.loading
            })
            .addCase(thunk.rejected, (state, action) => {
                state.status = LoadStatus.failed
                state.error = action.error.message
            })

        return this.builder
    }

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
}
