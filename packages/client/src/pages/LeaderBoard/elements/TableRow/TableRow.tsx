import { FC, useState } from 'react'
import { TableRowProps } from './type'
import TableCell from '../TableCell'
import { getCorrectForm } from '@utils/helpers/convertWord'
import {
    SortAscend,
    SortAscendLetter,
    SortDescend,
    SortDescendLetter,
} from '@assets/icons'
import styles from './tableRow.module.css'
import { SortRating } from '../../type'
import clsx from 'clsx'
import { teamName } from '@api/leaderBoard/constants'
import { sortLeaderboardTable } from '@utils/sort/quickSort'
import { useSelector } from 'react-redux'
import { leaderboardActions, leaderboardSelectors } from '@store/leaderboard'
import { useAppDispatch } from '@store/hooks'
import { LeaderboardTable } from '@api/leaderBoard/types'

const TableRow: FC<TableRowProps> = ({ row, index }) => {
    const leaderboardData = useSelector(leaderboardSelectors.selectData)
    const dispatch = useAppDispatch()
    const [sortConfig, setSortConfig] = useState<{ [key: string]: SortRating }>(
        {
            position: SortRating.ascend,
            user_name: SortRating.ascend,
            [teamName]: SortRating.descend,
        }
    )
    const handleSortClick = (key: keyof LeaderboardTable) => () => {
        setSortConfig(prevSortConfig => ({
            ...prevSortConfig,
            [key]:
                prevSortConfig[key] === SortRating.ascend
                    ? SortRating.descend
                    : SortRating.ascend,
        }))
        dispatch(
            leaderboardActions.setData(
                sortLeaderboardTable(leaderboardData, sortConfig[key], key)
            )
        )
    }
    const colorToClass: Record<number, string> = {
        1: styles.colorFirst,
        2: styles.colorSecond,
        3: styles.colorThird,
    }
    return (
        <div
            key={index}
            className={clsx(styles.row, colorToClass[row.position])}
        >
            <TableCell
                content={row.position}
                icon={
                    sortConfig.position === SortRating.ascend ? (
                        <SortAscend />
                    ) : (
                        <SortDescend />
                    )
                }
                align="start"
                onSortClick={handleSortClick('position')}
            />
            <TableCell
                content={row.user_name}
                icon={
                    sortConfig.ratingFieldName === SortRating.ascend ? (
                        <SortAscendLetter />
                    ) : (
                        <SortDescendLetter />
                    )
                }
                align="center"
                onSortClick={handleSortClick('user_name')}
            />
            <TableCell
                content={
                    <>
                        <span className={styles.countPoints}>
                            {row[teamName]}
                        </span>{' '}
                        {getCorrectForm(row[teamName], 'очко', 'очка', 'очков')}
                    </>
                }
                icon={
                    sortConfig.limit === SortRating.ascend ? (
                        <SortAscend />
                    ) : (
                        <SortDescend />
                    )
                }
                align="end"
                isEnd
                onSortClick={handleSortClick(teamName)}
            />
        </div>
    )
}

export default TableRow
