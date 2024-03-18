import { FC, useEffect, useState } from 'react'
import styles from './profileInfo.module.css'
import Title from '@components/Title'
import Avatar from '@components/Avatar'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { omit } from 'lodash'
import { useCheckAuthentication } from '@utils'
import { UserDTO } from '@api/auth/types'
import { resourcesApi } from '@api'
import { updateProfile } from '@/services/profile'

export const ProfileInfo: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const toggleEditMode = () => {
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
    if (userData && avatarUrl !== undefined) {
      setIsLoading(false)
    }
  }, [userData, avatarUrl])

  useEffect(() => {
    const fetchAvatar = async () => {
      if (userData) {
        if ('avatar' in userData && userData.avatar) {
          const avatar = await resourcesApi.get(userData.avatar)
          setAvatarUrl(avatar)
        } else {
          setAvatarUrl('')
        }
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
          variant: 'outlined',
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
