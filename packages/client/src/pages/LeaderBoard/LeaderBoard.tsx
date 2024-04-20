import { FC, useEffect, useState } from 'react'
import Title from '@components/Title'
import styles from './leaderBoard.module.css'
import TableRow from './elements/TableRow'
import { teamName } from '@api/leaderBoard/constants'
import { useDispatch, useSelector } from 'react-redux'
import {
    getLeaderboard,
    leaderboardActions,
    leaderboardSelectors,
} from '@store/leaderboard'
import { AppDispatch } from '@store'
import { useAppSelector } from '@store/hooks'

const LeaderBoard: FC = () => {
    const leaderboardData = useSelector(leaderboardSelectors.selectData)
    const hasMoreData = useSelector(leaderboardSelectors.selectHasMoreDate)
    const cursor = useAppSelector(leaderboardSelectors.selectCursor)
    const loadStatus = useAppSelector(leaderboardSelectors.selectStatus)
    const isLoading = loadStatus === 'loading'
    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const scrollHandler = (e: Event) => {
        if (
            (e.target as Document).documentElement.scrollHeight -
                ((e.target as Document).documentElement.scrollTop +
                    window.innerHeight) <
            100
        ) {
            dispatch(leaderboardActions.incrementCursor())
        }
    }
    const fetchData = async () => {
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
    }
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            fetchData()
        }
    }, [cursor, isMounted])

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
