import { FC, useState } from 'react'
import { TableRowProps } from './type'
import TableCell from '../TableCell'
import { getCorrectForm } from '@/utils/helpers/convertWord'
import {
  SortAscend,
  SortAscendLetter,
  SortDescend,
  SortDescendLetter,
} from '@/assets/icons'
import styles from './tableRow.module.css'
import { SortRating } from '../../type'
import clsx from 'clsx'

const TableRow: FC<TableRowProps> = ({ row, index }) => {
  const [sortConfig, setSortConfig] = useState<{ [key: string]: SortRating }>({
    position: SortRating.ascend,
    name: SortRating.ascend,
    limit: SortRating.descend,
  })
  const handleSortClick = (key: string) => {
    return () => {
      setSortConfig(prevSortConfig => ({
        ...prevSortConfig,
        [key]:
          prevSortConfig[key] === SortRating.ascend
            ? SortRating.descend
            : SortRating.ascend,
      }))
    }
  }
  const colorToClass: Record<number, string> = {
    1: styles.colorFirst,
    2: styles.colorSecond,
    3: styles.colorThird,
  }
  return (
    <div key={index} className={clsx(styles.row, colorToClass[row.position])}>
      <TableCell
        content={row.position}
        icon={
          sortConfig['position'] === SortRating.ascend ? (
            <SortAscend />
          ) : (
            <SortDescend />
          )
        }
        align="start"
        onSortClick={handleSortClick('position')}
      />
      <TableCell
        content={row.ratingFieldName}
        icon={
          sortConfig['ratingFieldName'] === SortRating.ascend ? (
            <SortAscendLetter />
          ) : (
            <SortDescendLetter />
          )
        }
        align="center"
        onSortClick={handleSortClick('ratingFieldName')}
      />
      <TableCell
        content={
          <>
            <span className={styles.countPoints}>{row.limit}</span>{' '}
            {getCorrectForm(row.limit, 'очко', 'очка', 'очков')}
          </>
        }
        icon={
          sortConfig['limit'] === SortRating.ascend ? (
            <SortAscend />
          ) : (
            <SortDescend />
          )
        }
        align="end"
        isEnd
        onSortClick={handleSortClick('limit')}
      />
    </div>
  )
}

export default TableRow
