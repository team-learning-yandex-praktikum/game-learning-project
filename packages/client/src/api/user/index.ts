import { BaseApi } from '@api/baseApi'
import { UserDTO } from '@api/auth/types'
import { UpdatingPasswordDTO, UpdatingProfileDTO } from './types'

export class UserApi extends BaseApi {
    constructor() {
        super('user')
    }

    updateProfile = async (profileData: UpdatingProfileDTO) => {
        const { data } = await this.client.put<UserDTO>(
            this.withUrl('profile'),
            profileData
        )
        return data
    }

    updateAvatar = async (avatarData: FormData) => {
        const { data } = await this.client.put<UserDTO>(
            this.withUrl('profile/avatar'),
            avatarData
        )
        return data
    }

    updatePassword = async (passwordData: UpdatingPasswordDTO) => {
        const { data } = await this.client.put<string>(
            this.withUrl('password'),
            passwordData
        )
        return data
    }

    getUser = async (id: string) => {
        const { data } = await this.client.get<UserDTO>(this.withUrl(id))
        return data
    }
}

export const userApi = new UserApi()
