import { UserDTO } from '@api/auth/types'

export type UpdatingProfileDTO = Omit<UserDTO, 'id' | 'avatar'>
export interface UpdatingPasswordDTO {
    oldPassword: string
    newPassword: string
}
