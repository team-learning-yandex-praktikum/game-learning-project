import { AvatarImage } from '@/assets/images'
import styles from './avatar.module.css'
import { FC } from 'react'

export const Profile: FC = () => {
  return (
    <div className={styles.avatarContainer}>
      <img src={AvatarImage} alt="Avatar" className={styles.avatarImage}></img>
    </div>
  )
}

export default Profile
