import Comment from './elements/Comment'
import InputLine from './elements/InputLine'
import styles from './forumTopic.module.css'
import { FORUM_TOPIC_COMMENT_STUB, FORUM_TOPIC_STUB } from './stub'

const ForumTopic = () => {
  const { title, description, author, date } = FORUM_TOPIC_STUB

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.topicInfo}>
          <div className={styles.meta}>
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <div className={styles.title}>{title}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
        <div className={styles.divider} />
        <div className={styles.subTitle}>Комментарии</div>
      </header>
      <main className={styles.content}>
        {Array(10)
          .fill(FORUM_TOPIC_COMMENT_STUB)
          .map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
      </main>
      <InputLine />
    </div>
  )
}

export default ForumTopic
