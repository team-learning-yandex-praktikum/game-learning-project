export type TableCellProps = {
  content: React.ReactNode
  align: 'start' | 'center' | 'end'
  isHeader: boolean
  icon?: React.ReactNode
  isEnd?: boolean
}
