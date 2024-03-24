import { FC, ReactNode } from 'react'
import styles from './profile.module.css'
import ProfileInfo from './elements/ProfileInfo'
import ProfilePassword from './elements/ProfilePassword'
import ProfileExit from './elements/ProfileExit'
import { useSidebarSections } from '@utils/hooks/useSidebarSections'
import { TabProfile } from '@pages/Profile/type'

const profileSections: Record<TabProfile, string> = {
    [TabProfile.ProfileInfo]: 'Основная информация',
    [TabProfile.ProfilePassword]: 'Пароль',
    [TabProfile.ProfileExit]: 'Выход',
}

const tabContent: Record<string, ReactNode> = {
    [TabProfile.ProfileInfo]: <ProfileInfo />,
    [TabProfile.ProfilePassword]: <ProfilePassword />,
    [TabProfile.ProfileExit]: <ProfileExit />,
}

export const Profile: FC = () => {
    const currentSection =
        useSidebarSections({
            sections: Object.keys(profileSections),
            selected: TabProfile.ProfileInfo,
            mapKeysToSections: profileSections,
        }) ?? TabProfile.ProfileInfo

    return <div className={styles.container}>{tabContent[currentSection]}</div>
}

export default Profile
