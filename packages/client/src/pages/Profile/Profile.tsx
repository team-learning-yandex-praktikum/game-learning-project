import { FC, useState } from 'react'
import styles from './profile.module.css'
import ProfileInfo from './elements/ProfileInfo'
import ProfilePassword from './elements/ProfilePassword'
import { TabProfile } from './type'
import ProfileExit from './elements/ProfileExit'

export const Profile: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabProfile>(
    TabProfile.profileInfo
  ) // todo: переключение между вкладками будет работать после подключения store
  return (
    <div className={styles.container}>
      {currentTab === TabProfile.profileInfo && <ProfileInfo />}
      {currentTab === TabProfile.profilePassword && <ProfilePassword />}
      {currentTab === TabProfile.profileExit && <ProfileExit />}
    </div>
  )
}

export default Profile
