import { FC, useCallback, useEffect, useState } from 'react'
import Title from '@components/Title'
import styles from './leaderBoard.module.css'
import TableRow from './elements/TableRow'
import { teamName } from '@api/leaderBoard/constants'
import {
    getLeaderboard,
    leaderboardActions,
    leaderboardSelectors,
} from '@store/leaderboard'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const LeaderBoard: FC = () => {
    const leaderboardData = useAppSelector(leaderboardSelectors.selectData)
    const hasMoreData = useAppSelector(leaderboardSelectors.selectHasMoreDate)
    const cursor = useAppSelector(leaderboardSelectors.selectCursor)
    const loadStatus = useAppSelector(leaderboardSelectors.selectStatus)
    const isLoading = loadStatus === 'loading'
    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useAppDispatch()

    const scrollHandler = useCallback(
        (e: Event) => {
            if (
                (e.target as Document).documentElement.scrollHeight -
                    ((e.target as Document).documentElement.scrollTop +
                        window.innerHeight) <
                100
            ) {
                dispatch(leaderboardActions.incrementCursor())
            }
        },
        [dispatch]
    )

    const fetchData = useCallback(async () => {
        if (!hasMoreData || isLoading) {
            return
        }
        try {
            dispatch(
                getLeaderboard({
                    ratingFieldName: teamName,
                    cursor: cursor,
                    limit: 20,
                })
            )
        } catch (error) {
            console.error(error)
        }
    }, [hasMoreData, isLoading, dispatch, cursor])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [scrollHandler])

    useEffect(() => {
        if (isMounted) {
            fetchData()
        }
    }, [cursor, fetchData, isMounted])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Title className={styles.title}>Рейтинг</Title>
                <hr className={styles.line} />
            </header>
            <div className={styles.table}>
                {leaderboardData.map((row, index) => (
                    <TableRow key={index} row={row} index={row.position} />
                ))}
            </div>
        </div>
    )
}

export default LeaderBoard
