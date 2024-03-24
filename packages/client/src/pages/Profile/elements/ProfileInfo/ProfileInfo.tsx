import { FC, MouseEvent, useCallback, useMemo, useState } from 'react'
import styles from './profileInfo.module.css'
import Title from '@components/Title'
import Avatar from '@pages/Profile/elements/Avatar'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { omit, pick } from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { updateUserData, userSelectors } from '@store/user'
import { User } from '@store/user/types'

const updatingFieldsConfig = pick(fieldsConfig, [
    'login',
    'displayName',
    'firstName',
    'secondName',
    'email',
    'phone',
])

export const ProfileInfo: FC = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const userData = useAppSelector(userSelectors.selectData)
    const loadStatus = useAppSelector(userSelectors.selectStatus)
    const dispatch = useAppDispatch()

    const isLoading = loadStatus === 'loading'

    const toggleEditMode = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
        setIsEditMode(prevEditMode => !prevEditMode)
    }, [])

    const handleSaveProfile = useCallback(
        async (data: Omit<Partial<User>, 'id' | 'avatar'>) => {
            if (!isEditMode) {
                return
            }

            await dispatch(updateUserData(data))

            toggleEditMode()
        },
        [isEditMode, dispatch, toggleEditMode]
    )

    const defaultValues = useMemo(
        () => omit(userData, ['id', 'avatar']),
        [userData]
    )

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <>
            <Avatar avatar={userData?.avatarImage} />
            <Title className={styles.title}>{userData?.login ?? ''}</Title>
            <Form
                fields={updatingFieldsConfig}
                disabled={!isEditMode}
                defaultValues={defaultValues}
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
