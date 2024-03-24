import { ButtonProps } from '@components/Button/types'
import { NavLinkProps } from 'react-router-dom'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { FieldsConfig } from '@utils/validation/fieldsConfig'
import { TitleProps } from '@components/Title/types'

export interface FormProps<Values extends FieldValues = FieldValues> {
    fields: Partial<FieldsConfig>
    title?: string
    disabled?: boolean
    defaultValues?: FieldValues
    TitleProps?: Partial<TitleProps>
    SubmitButtonProps?: ButtonProps
    CancelButtonProps?: ButtonProps
    LinkProps?: NavLinkProps
    onSubmit: SubmitHandler<Values>
}
