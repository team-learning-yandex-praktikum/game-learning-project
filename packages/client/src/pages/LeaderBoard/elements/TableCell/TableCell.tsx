import { FC } from 'react'
import styles from './tableCell.module.css'
import { TableCellProps } from './type'

const TableCell: FC<TableCellProps> = ({
  content,
  icon,
  align,
  isHeader,
  isEnd,
}) => {
  return (
    <div
      className={`${styles.cell} ${isHeader ? styles.header : ''} ${
        isEnd ? styles.end : ''
      } ${styles[align]}`}>
      <div className={isHeader ? styles.cellContent : ''}>
        {icon && <div className={styles.iconCell}>{icon}</div>}
        {content}
      </div>
    </div>
  )
}

export default TableCell
