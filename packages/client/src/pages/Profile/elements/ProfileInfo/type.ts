import { UserDTO } from '@api/auth/types'

export type ProfileInfoProps = {
  user: UserDTO
  onSaveProfile: (data: Omit<UserDTO, 'id' | 'display_name' | 'avatar'>) => void
}
