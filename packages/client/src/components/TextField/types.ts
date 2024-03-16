import { FieldError } from 'react-hook-form'
import { JsxElementAttributes } from '@types'

type BasePropsSet = 'placeholder' | 'value' | 'readOnly' | 'onChange' | 'name'

type JsxInput = JsxElementAttributes<'input'>
type JsxInputProps = Pick<JsxInput, BasePropsSet | 'type'>
type JsxTextAreaProps = Pick<JsxElementAttributes<'textarea'>, BasePropsSet>

type BaseTextFieldProps = {
  label?: string
  error?: string | FieldError
  className?: string
  disableErrorText?: boolean
}

export type InputProps = JsxInputProps &
  BaseTextFieldProps & {
    multiline?: false
  }

export type TextAreaProps = JsxTextAreaProps &
  BaseTextFieldProps & {
    multiline: true
  }

export type TextFieldProps = InputProps | TextAreaProps
