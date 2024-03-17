import { FC } from 'react'
import styles from './tableCell.module.css'
import { TableCellProps } from './type'
import clsx from 'clsx'

const TableCell: FC<TableCellProps> = ({
  content,
  icon,
  align,
  isEnd,
  onSortClick,
}) => {
  return (
    <div className={clsx(styles.cell, isEnd && styles.end, styles[align])}>
      <div className={styles.cellContent}>
        {icon && (
          <div className={styles.iconCell} onClick={onSortClick}>
            {icon}
          </div>
        )}
        {content}
      </div>
    </div>
  )
}

export default TableCell
