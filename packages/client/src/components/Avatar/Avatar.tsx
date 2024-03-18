import { AvatarImage } from '@assets/images'
import styles from './avatar.module.css'
import { ChangeEvent, FC, useState } from 'react'
import clsx from 'clsx'
import { AvatarProps } from './type'
import serviceProfile from '@/services/profile'

export const Avatar: FC<AvatarProps> = ({ avatar }) => {
  const [avatarProfile, setAvatar] = useState<string>(avatar ? avatar : '')

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      const newAvatar = await serviceProfile.updateAvatar(formData)
      setAvatar(newAvatar)
    }
  }

  return (
    <div
      className={clsx(
        styles.avatarContainer,
        !avatarProfile
          ? styles.avatarBackgroundDefault
          : styles.avatarBackground
      )}>
      <img
        src={avatarProfile ? avatarProfile : AvatarImage}
        alt="Avatar"
        className={styles.avatarImage}></img>
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
