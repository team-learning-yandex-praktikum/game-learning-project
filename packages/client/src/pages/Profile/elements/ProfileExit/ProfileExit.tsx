import { FC, useCallback } from 'react'
import styles from './profileExit.module.css'
import Title from '@components/Title'
import Button from '@components/Button'
import { useNavigate } from 'react-router'
import { Routes } from '@routes/constants'
import { useAppDispatch } from '@store/hooks'
import { logout } from '@store/user'

export const ProfileExit: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleClick = useCallback(async () => {
        try {
            await dispatch(logout()).unwrap()
            navigate(Routes.Login)
        } catch (e) {
            console.error(e)
        }
    }, [dispatch, navigate])

    return (
        <>
            <Title className={styles.title}>Уходите?</Title>
            <Button
                className={styles.button}
                variant="outlined"
                onClick={handleClick}
                color="secondary"
            >
                Да
            </Button>
        </>
    )
}

export default ProfileExit
