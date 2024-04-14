import { BaseApi } from '@api/baseApi'
import { LoginDTO, RegistrationDTO, SignupResponse, UserDTO } from './types'

export class AuthApi extends BaseApi {
    constructor() {
        super('auth')
    }

    me = async () => {
        const { data } = await this.client.get<UserDTO>(this.withUrl('user'))
        return data
    }

    create = async (registrationData: RegistrationDTO) => {
        const { data } = await this.client.post<SignupResponse>(
            this.withUrl('signup'),
            registrationData
        )
        return data
    }

    login = async (loginData: LoginDTO) => {
        const { data } = await this.client.post<string>(
            this.withUrl('signin'),
            loginData
        )
        return data
    }

    logout = async () => {
        const { data } = await this.client.post<string>(this.withUrl('logout'))
        return data
    }
}

export const authApi = new AuthApi()
