import { FC } from 'react'
import { clsx } from 'clsx'
import styles from './button.module.css'
import { ButtonColor, ButtonProps, ButtonVariant } from './types'

const variantToClass: Record<ButtonVariant, string> = {
    contained: styles.contained,
    outlined: styles.outlined,
}

const colorToClass: Record<ButtonColor, string> = {
    main: styles.colorMain,
    secondary: styles.colorSecondary,
}

const Button: FC<ButtonProps> = ({
    variant = 'contained',
    color = 'main',
    className,
    ...props
}) => (
    <button
        {...props}
        className={clsx(
            styles.button,
            variantToClass[variant],
            colorToClass[color],
            props.disabled && styles.disabled,
            className
        )}
    />
)

export default Button
