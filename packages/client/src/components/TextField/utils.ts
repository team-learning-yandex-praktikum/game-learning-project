import { TextAreaProps, TextFieldProps } from '@components/TextField/types'

export function isMultiline(props: TextFieldProps): props is TextAreaProps {
    return Boolean(props.multiline)
}
