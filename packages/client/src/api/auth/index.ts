import { BaseApi } from '@api/baseApi'
import { LoginDTO, RegistrationDTO, SignupResponse, UserDTO } from './types'

export class AuthApi extends BaseApi {
  constructor() {
    super('auth')
  }

  me = async () => {
    const { data } = await this.client.get<UserDTO>('user')
    return data
  }

  create = async (registrationData: RegistrationDTO) => {
    const { data } = await this.client.post<SignupResponse>(
      'signup',
      registrationData
    )
    return data
  }

  login = async (loginData: LoginDTO): Promise<string> => {
    const { data } = await this.client.post<string>('signin', loginData)
    return data
  }

  logout = async (): Promise<string> => {
    const { data } = await this.client.post<string>('logout')
    return data
  }
}

export const authApi = new AuthApi()
