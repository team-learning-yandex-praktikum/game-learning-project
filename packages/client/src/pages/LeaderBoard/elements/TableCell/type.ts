import { ReactNode } from 'react'

export type TableCellProps = {
    content: ReactNode
    align: 'start' | 'center' | 'end'
    icon?: ReactNode
    isEnd?: boolean
    onSortClick: () => void
}
