import { FC, useCallback, useEffect, useState } from 'react'
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
    const [isEditMode, setIsEditMode] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const toggleEditMode = useCallback(
        (e?: React.MouseEvent<HTMLButtonElement>) => {
            e?.preventDefault()
            setIsEditMode(prevEditMode => !prevEditMode)
        },
        [setIsEditMode]
    )
    const { userData, setUserData } = useCheckAuthentication()
    const handleSaveProfile = async (
        data: Omit<UserDTO, 'id' | 'display_name' | 'avatar'>
    ) => {
        if (isEditMode && userData && 'display_name' in userData) {
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
                if (userData?.avatar) {
                    const avatar = await resourcesApi.get(userData.avatar)
                    setAvatarUrl(avatar)
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
        return <>Loading...</>
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
                disabled={!isEditMode}
                defaultValues={omit(userData, ['id', 'display_name', 'avatar'])}
                SubmitButtonProps={{
                    children: isEditMode ? 'Сохранить' : 'Изменить',
                    variant: isEditMode ? 'contained' : 'outlined',
                    disabled: !isEditMode ? false : undefined,
                    onClick: !isEditMode ? toggleEditMode : undefined,
                }}
                CancelButtonProps={
                    isEditMode
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
