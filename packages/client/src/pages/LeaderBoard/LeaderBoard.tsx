import { FC } from 'react'
import Title from '@components/Title'
import styles from './leaderBoard.module.css'
import { playersData } from './stub'
import TableRow from './elements/TableRow'

const LeaderBoard: FC = () => (
    <div className={styles.container}>
        <header className={styles.header}>
            <Title className={styles.title}>Рейтинг</Title>
            <hr className={styles.line} />
        </header>
        <div className={styles.table}>
            {playersData.map((row, index) => (
                <TableRow key={index} row={row} index={index} />
            ))}
        </div>
    </div>
)

export default LeaderBoard
