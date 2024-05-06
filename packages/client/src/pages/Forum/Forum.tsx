import NewTopic from './elements/NewTopic'
import Topics from './elements/Topics'
import styles from './forum.module.css'
import { useSidebarSections } from '@utils/hooks/useSidebarSections'
import { memo, ReactNode } from 'react'
import { ForumSection, forumSectionTranslations } from './sections'

const sectionToComponent: Record<string, ReactNode> = {
    [ForumSection.all]: <Topics />,
    [ForumSection.new]: <NewTopic />,
}

const Forum = () => {
    const currentSection =
        useSidebarSections({
            sections: Object.keys(ForumSection),
            selected: ForumSection.all,
            mapKeysToSections: forumSectionTranslations,
        }) ?? ForumSection.all

    return (
        <div className={styles.container}>
            {sectionToComponent[currentSection]}
        </div>
    )
}

export default memo(Forum)
