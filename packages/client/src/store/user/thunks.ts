import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, userApi } from '@api'
import { User } from '@store/user/types'
import { transformData } from '@utils/data'
import { UserDTO } from '@api/auth/types'

export const fetchUserData = createAsyncThunk('user/fetch', async () => {
    const response = await authApi.me()
    return transformData.from.dto<User>(response)
})
export const updateUserData = createAsyncThunk(
    'user/update',
    async (data: Partial<User>) => {
        const transformedRequestData = transformData.to.dto<UserDTO>(data)
        const response = await userApi.updateProfile(transformedRequestData)
        return transformData.from.dto<User>(response)
    }
)
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    userApi.updatePassword
)
