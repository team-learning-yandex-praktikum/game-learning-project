import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, resourcesApi, userApi } from '@api'
import { transformData } from '@utils/data'
import { LoginDTO, RegistrationDTO, UserDTO } from '@api/auth/types'
import { RequestRegistrationData, User } from './types'
import { OauthSignInRequest } from '@api/oAuth/types'
import { oAuthApi } from '@api/oAuth'

export const fetchUserAvatar = createAsyncThunk(
    'user/fetchAvatar',
    async (path?: string | null) => {
        if (!path) {
            return undefined
        }

        return await resourcesApi.get(path)
    }
)

export const fetchUserData = createAsyncThunk(
    'user/fetch',
    async (_, { dispatch }) => {
        const response = await authApi.me()
        dispatch(fetchUserAvatar(response.avatar))

        return transformData.from.dto<User>(response)
    }
)

export const updateUserAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (file: File, { dispatch }) => {
        const formData = new FormData()
        formData.append('avatar', file)
        const response = await userApi.updateAvatar(formData)

        dispatch(fetchUserAvatar(response.avatar))

        return transformData.from.dto<User>(response)
    }
)

export const updateUserData = createAsyncThunk(
    'user/update',
    async (data: Partial<User>, { dispatch }) => {
        const transformedRequestData = transformData.to.dto<UserDTO>(data)
        const response = await userApi.updateProfile(transformedRequestData)
        dispatch(fetchUserAvatar(response.avatar))
        return transformData.from.dto<User>(response)
    }
)

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    userApi.updatePassword
)

export const login = createAsyncThunk(
    'user/login',
    async (data: LoginDTO, { dispatch }) => {
        const response = await authApi.login(data)
        dispatch(fetchUserData())
        return response
    }
)

export const loginWithYandex = createAsyncThunk(
    'user/loginWithYandex',
    async (req: OauthSignInRequest, { dispatch }) => {
        const response = await oAuthApi.exchangeCodeForToken(req)
        dispatch(fetchUserData())
        return response
    }
)

export const registration = createAsyncThunk(
    'user/registration',
    async (data: RequestRegistrationData, { dispatch }) => {
        const transformedData = transformData.to.dto<RegistrationDTO>(data)
        const response = await authApi.create(transformedData)
        dispatch(fetchUserData())
        return response
    }
)

export const logout = createAsyncThunk('user/logout', authApi.logout)
