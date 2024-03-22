import {
    ActionReducerMapBuilder,
    AsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from '@store/enums'
import { userInitialState } from './initialState'
import { fetchUserData, updatePassword, updateUserData } from './thunks'
import { UserState } from './types'

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
        this.addCommonCase(updatePassword)

        return this
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {},
    selectors: {
        selectStatus: state => state.status,
        selectData: state => state.data,
    },
    extraReducers: builder => {
        new UserAsyncCases(builder)
            .fetchingUser()
            .updatingUser()
            .updatingPassword()
    },
})

export const userReducer = userSlice.reducer
export const userSelectors = userSlice.selectors
export const userActions = userSlice.actions
