import { FC } from 'react'
import styles from './profilePassword.module.css'
import Title from '@components/Title'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { updatePassword } from '@services/profile'

export const ProfilePassword: FC = () => (
    <>
        <Title className={styles.title}>Изменить пароль</Title>
        <Form
            fields={{
                old_password: fieldsConfig.old_password,
                new_password: fieldsConfig.new_password,
                new_password_repeat: fieldsConfig.new_password_repeat,
            }}
            SubmitButtonProps={{
                children: 'Сохранить',
                variant: 'outlined',
            }}
            onSubmit={updatePassword}
        />
    </>
)

export default ProfilePassword