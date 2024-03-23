import { AvatarImage } from '@assets/images'
import styles from './avatar.module.css'
import { ChangeEvent, FC, useCallback, useState } from 'react'
import clsx from 'clsx'
import { AvatarProps } from './type'
import { updateAvatar } from '@services/profile'

export const Avatar: FC<AvatarProps> = ({ avatar }) => {
    const [avatarProfile, setAvatar] = useState<string>(avatar ?? '')

    const handleFileChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                const formData = new FormData()
                formData.append('avatar', file)
                const newAvatar = await updateAvatar(formData)
                setAvatar(newAvatar)
            }
        },
        [setAvatar]
    )

    return (
        <div
            className={clsx(
                styles.avatarContainer,
                avatarProfile
                    ? styles.avatarBackground
                    : styles.avatarBackgroundDefault
            )}
        >
            <img
                src={avatarProfile ?? AvatarImage}
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
