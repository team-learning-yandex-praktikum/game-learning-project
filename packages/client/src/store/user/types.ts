import { UserDTO } from '@api/auth/types'
import { BaseState } from '@utils/store/types'

type SnakeCaseUserKeys = 'display_name' | 'first_name' | 'second_name'

export interface User extends Omit<UserDTO, SnakeCaseUserKeys> {
    displayName: UserDTO['display_name']
    firstName: UserDTO['first_name']
    secondName: UserDTO['second_name']
    avatarImage?: string
}

export interface UserState extends BaseState {
    data: Partial<User>
}

export type RequestRegistrationData = Omit<User, 'avatarImage' | 'avatar'>
