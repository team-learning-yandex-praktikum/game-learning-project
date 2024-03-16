import { FC } from 'react'
import styles from './profile.module.css'
import ProfileInfo from './elements/ProfileInfo'
// import ProfilePassword from './elements/ProfilePassword'
// import ProfileExit from './elements/ProfileExit'

export const Profile: FC = () => {
  return (
    <div className={styles.container}>
      <ProfileInfo />
      {/* <ProfilePassword /> */}
      {/* <ProfileExit /> */}
    </div>
  )
}

export default Profile
