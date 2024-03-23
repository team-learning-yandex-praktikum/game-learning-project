import React, { FC, useCallback } from 'react'
import styles from './profilePassword.module.css'
import Title from '@components/Title'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { useAppDispatch } from '@store/hooks'
import { UpdatingPasswordDTO } from '@api/user/types'
import { updatePassword } from '@store/user'

export const ProfilePassword: FC = () => {
    const dispatch = useAppDispatch()

    const onSubmit = useCallback(
        (data: UpdatingPasswordDTO) => {
            dispatch(updatePassword(data))
        },
        [dispatch]
    )

    return (
        <>
            <Title className={styles.title}>Изменить пароль</Title>
            <Form
                fields={{
                    oldPassword: fieldsConfig.oldPassword,
                    newPassword: fieldsConfig.newPassword,
                    newPasswordRepeat: fieldsConfig.newPasswordRepeat,
                }}
                SubmitButtonProps={{
                    children: 'Сохранить',
                    variant: 'outlined',
                }}
                onSubmit={onSubmit}
            />
        </>
    )
}

export default ProfilePassword
