import NewTopic from './elements/NewTopic'
import Topics from './elements/Topics'
import styles from './forum.module.css'
import { useSidebarSections } from '@utils/hooks/useSidebarSections'

const forumSections = {
    all: 'Все темы',
    new: 'Создать тему',
}

const Forum = () => {
    const currentSection = useSidebarSections({
        sections: Object.values(forumSections),
        selected: forumSections.all,
    })

    return (
        <div className={styles.container}>
            {currentSection === forumSections.all ? <Topics /> : <NewTopic />}
        </div>
    )
}

export default Forum
