import { AvatarImage } from '@assets/images'
import styles from './avatar.module.css'
import { ChangeEventHandler, FC, useCallback } from 'react'
import { clsx } from 'clsx'
import { AvatarProps } from './type'
import { useAppDispatch } from '@store/hooks'
import { updateUserAvatar } from '@store/user'

export const Avatar: FC<AvatarProps> = ({ avatar }) => {
    const dispatch = useAppDispatch()

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        async e => {
            const file = e.target.files?.[0]
            if (file) {
                dispatch(updateUserAvatar(file))
            }
        },
        [dispatch]
    )

    return (
        <div
            className={clsx(
                styles.avatarContainer,
                avatar
                    ? styles.avatarBackground
                    : styles.avatarBackgroundDefault
            )}
        >
            <img
                src={avatar || AvatarImage}
                alt="Avatar"
                className={styles.avatarImage}
            />
            <input
                className={styles.inputFile}
                name="avatar"
                type="file"
                onChange={handleFileChange}
            />
        </div>
    )
}

export default Avatar
