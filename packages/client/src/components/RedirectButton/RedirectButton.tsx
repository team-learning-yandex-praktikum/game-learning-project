import { openInCurrent, openInPopup } from '@utils/ui/popup'
import { UrlProducer, UrlType } from '@utils/url/helpers'
import {
    ButtonHTMLAttributes,
    FC,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
} from 'react'
import { clsx } from 'clsx'
import styles from './styles.module.css'

type Url = UrlType | UrlProducer

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: Url
    inPopup?: boolean
    label?: string
    children?: ReactNode
}

const RedirectButton: FC<Props> = ({
    url,
    label,
    inPopup = false,
    ...props
}) => {
    const handleClick = useCallback(() => {
        if (inPopup) {
            openInPopup(url)
        } else {
            openInCurrent(url)
        }
    }, [inPopup, url])

    return (
        <button
            type="button"
            onClick={handleClick}
            {...props}
            className={clsx(styles.button)}
        >
            <span>{label}</span>
        </button>
    )
}

export default RedirectButton
