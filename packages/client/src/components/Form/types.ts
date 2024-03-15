import { ButtonProps } from '@components/Button/types'
import { NavLinkProps } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { FIELDS, FieldValues } from '@utils/validation/fields'
import { FieldsConfig } from '@utils/validation/fieldsConfig'
import { TitleProps } from '@components/Title/types'

export interface FormProps {
  fields: Partial<FieldsConfig>
  title?: string
  disabled?: boolean
  defaultValues?: Partial<Record<FIELDS, string>>
  TitleProps?: Partial<TitleProps>
  SubmitButtonProps?: ButtonProps
  CancelButtonProps?: ButtonProps
  LinkProps?: NavLinkProps
  onSubmit: SubmitHandler<FieldValues>
}
