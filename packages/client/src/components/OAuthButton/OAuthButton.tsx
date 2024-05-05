import { FC } from 'react'
import { clsx } from 'clsx'
import styles from './oAuthButton.module.css'
import { OAuthButtonProps } from './types'
import Button from '@components/Button'

const OAuthButton: FC<OAuthButtonProps> = ({
    url,
    children = 'Я.ID',
    ...props
}) => (
    <a href={url}>
        <Button
            type="button"
            {...props}
            color={'secondary'}
            className={clsx(styles.button, props.className)}
        >
            {children}
        </Button>
    </a>
)

export default OAuthButton
