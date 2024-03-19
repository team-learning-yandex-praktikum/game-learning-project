import { FC, useEffect, useState } from 'react'
import styles from './profileInfo.module.css'
import Title from '@components/Title'
import Avatar from '@pages/Profile/elements/Avatar'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { omit } from 'lodash'
import { useCheckAuthentication } from '@utils'
import { UserDTO } from '@api/auth/types'
import { resourcesApi } from '@api'
import { updateProfile } from '@services/profile'
import { ErrorResponse } from '@types'

export const ProfileInfo: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const toggleEditMode = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    setEditMode(prevEditMode => !prevEditMode)
  }
  const [userData, setUserData] = useCheckAuthentication()
  const handleSaveProfile = async (
    data: Omit<UserDTO, 'id' | 'display_name' | 'avatar'>
  ) => {
    if (editMode && userData && 'display_name' in userData) {
      const newProfileInfo = await updateProfile({
        ...data,
        display_name: userData?.display_name,
      })
      if (typeof setUserData === 'function') {
        setUserData(newProfileInfo || null)
        toggleEditMode()
      }
    }
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      setIsLoading(true)
      if (!userData) {
        return
      }
      try {
        if ('avatar' in userData && userData.avatar) {
          const avatar = await resourcesApi.get(userData.avatar)
          setAvatarUrl(avatar)
        } else {
          setAvatarUrl('')
        }
      } catch (e) {
        const error = e as ErrorResponse
        console.error(error.response?.data.reason)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAvatar()
  }, [userData])

  if (isLoading) {
    return <></>
  }
  return (
    <>
      <Avatar avatar={avatarUrl} />
      <Title className={styles.title}>ivan_ivanov</Title>
      <Form
        fields={omit(fieldsConfig, [
          'password',
          'repeat_password',
          'old_password',
          'new_password',
          'new_password_repeat',
        ])}
        disabled={!editMode}
        defaultValues={omit(userData, ['id', 'display_name', 'avatar'])}
        SubmitButtonProps={{
          children: editMode ? 'Сохранить' : 'Изменить',
          variant: editMode ? 'contained' : 'outlined',
          disabled: !editMode ? false : undefined,
          onClick: !editMode ? toggleEditMode : undefined,
        }}
        CancelButtonProps={
          editMode
            ? {
                children: 'Отменить',
                variant: 'outlined',
                onClick: toggleEditMode,
              }
            : undefined
        }
        onSubmit={handleSaveProfile}
      />
    </>
  )
}

export default ProfileInfo
