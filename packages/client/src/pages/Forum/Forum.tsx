import NewTopic from './elements/NewTopic'
import Topics from './elements/Topics'
import styles from './forum.module.css'

const Forum = () => {
    const currentSection = 'topics' // todo Убрать после подключения store

    return (
        <div className={styles.container}>
            {currentSection === 'topics' ? <Topics /> : <NewTopic />}
        </div>
    )
}

export default Forum
