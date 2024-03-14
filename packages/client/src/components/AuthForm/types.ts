import { TextFieldProps } from '@components/TextField/types'
import { ButtonProps } from '@components/Button/types'
import { NavLinkProps } from 'react-router-dom'

export interface AuthFormProps {
  title: string
  fields: TextFieldProps[]
  SubmitButtonProps: ButtonProps
  LinkProps: NavLinkProps
}
