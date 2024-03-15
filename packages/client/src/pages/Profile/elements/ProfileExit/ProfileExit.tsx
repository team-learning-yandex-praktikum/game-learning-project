import { FC, useState } from 'react'
import styles from './profileExit.module.css'
import Title from '@components/Title'
import TextField from '@components/TextField'
import Button from '@components/Button'

export const ProfileExit: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode)
  }
  return (
    <>
      <Title className={styles.title}>Уходите?</Title>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={toggleEditMode}
        color="secondary">
        Да
      </Button>
    </>
  )
}

export default ProfileExit
