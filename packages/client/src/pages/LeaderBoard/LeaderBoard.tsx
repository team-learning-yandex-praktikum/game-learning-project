import { FC } from 'react'
import Title from '@components/Title'
import styles from './leaderBoard.module.css'
import { getCorrectForm } from '@/utils/helpers/convertWord'
import { SortAscend, SortAscendLetter, SortDescend } from '@/assets/icons'
import { PlayerInfo } from './type'
import TableCell from './elements/TableCell'
const playersData: PlayerInfo[] = [
  { position: 1, ratingFieldName: 'ivan_ivanov', limit: 1024 },
  { position: 2, ratingFieldName: 'ivan_ivanov', limit: 1000 },
  { position: 3, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 4, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 5, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 6, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 7, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 8, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 9, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 10, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 11, ratingFieldName: 'ivan_ivanov', limit: 101 },
  { position: 12, ratingFieldName: 'ivan_ivanov', limit: 101 },
]
const LeaderBoard: FC = () => (
  <div className={styles.container}>
    <Title className={styles.title}>Рейтинг</Title>
    <hr className={styles.line} />
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        {playersData.map((row, index) => (
          <div key={index} className={styles.row}>
            <TableCell
              content={row.position}
              icon={index === 0 ? <SortAscend /> : undefined}
              align="start"
              isHeader={index === 0}
            />
            <TableCell
              content={row.ratingFieldName}
              icon={index === 0 ? <SortAscendLetter /> : undefined}
              align="center"
              isHeader={index === 0}
            />
            <TableCell
              content={
                <>
                  <span className={styles.countPoints}>{row.limit}</span>{' '}
                  {getCorrectForm(row.limit, 'очко', 'очка', 'очков')}
                </>
              }
              icon={index === 0 ? <SortDescend /> : undefined}
              align="end"
              isHeader={index === 0}
              isEnd
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default LeaderBoard
