export interface UserDTO {
    id: number
    login: string
    first_name: string
    second_name: string
    display_name: string | null
    avatar: string | null
    phone: string
    email: string
}

export interface RegistrationDTO
    extends Omit<UserDTO, 'id' | 'display_name' | 'avatar'> {
    password: string
}

export type LoginDTO = Pick<RegistrationDTO, 'login' | 'password'>

export interface SignupResponse {
    id: string
}
