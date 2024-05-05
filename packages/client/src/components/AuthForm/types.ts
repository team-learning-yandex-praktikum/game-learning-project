import { FormProps } from '@components/Form/types'
import { FieldValues } from 'react-hook-form'
import { LinkProps } from 'react-router-dom'

export interface AuthFormProps<Values extends FieldValues = FieldValues>
    extends FormProps<Values> {
    LinkProps: LinkProps
}
