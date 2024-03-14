import { JsxElementAttributes } from '@types'

export type ButtonVariant = 'contained' | 'outlined'
export type ButtonColor = 'main' | 'secondary'

type JsxButtonProps = Pick<
  JsxElementAttributes<'button'>,
  'children' | 'className' | 'onClick' | 'type' | 'disabled'
>

export interface ButtonProps extends JsxButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
}
