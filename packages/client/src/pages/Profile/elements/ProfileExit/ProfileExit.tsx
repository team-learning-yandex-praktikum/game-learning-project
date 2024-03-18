import { FC } from 'react'
import styles from './profileExit.module.css'
import Title from '@components/Title'
import Button from '@components/Button'
import { useNavigate } from 'react-router'
import { Routes } from '@routes/constants'
import { authApi } from '@api'

export const ProfileExit: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    authApi.logout()
    navigate(Routes.Login)
  }
  return (
    <>
      <Title className={styles.title}>Уходите?</Title>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={handleClick}
        color="secondary">
        Да
      </Button>
    </>
  )
}

export default ProfileExit
