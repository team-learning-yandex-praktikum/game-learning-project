import { JsxElementAttributes } from '@types'

type JsxInput = JsxElementAttributes<'input'>
type JsxInputProps = Pick<
  JsxInput,
  'placeholder' | 'value' | 'readOnly' | 'type' | 'onChange' | 'name'
>

export interface TextFieldProps extends JsxInputProps {
  label?: string
  error?: string
}
