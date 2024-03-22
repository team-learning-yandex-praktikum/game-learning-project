import { FC, ReactNode, useState } from 'react'
import styles from './profile.module.css'
import ProfileInfo from './elements/ProfileInfo'
import ProfilePassword from './elements/ProfilePassword'
import { TabProfile } from './type'
import ProfileExit from './elements/ProfileExit'

const tabContent: Record<TabProfile, ReactNode> = {
  [TabProfile.ProfileInfo]: <ProfileInfo />,
  [TabProfile.ProfilePassword]: <ProfilePassword />,
  [TabProfile.ProfileExit]: <ProfileExit />,
}

export const Profile: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabProfile>(
    TabProfile.ProfileInfo
  ) // todo: переключение между вкладками будет работать после подключения store
  return <div className={styles.container}>{tabContent[currentTab]}</div>
}

export default Profile
