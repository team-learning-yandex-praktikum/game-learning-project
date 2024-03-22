import { UserDTO } from '@api/auth/types'
import { LoadStatus } from '@store/enums'

type SnakeCaseUserKeys = 'display_name' | 'first_name' | 'second_name'

export interface User extends Omit<UserDTO, SnakeCaseUserKeys> {
    displayName: UserDTO['display_name']
    firstName: UserDTO['first_name']
    secondName: UserDTO['second_name']
}

export interface UserState {
    data: Partial<User>
    status: LoadStatus
    error?: string | null
}
