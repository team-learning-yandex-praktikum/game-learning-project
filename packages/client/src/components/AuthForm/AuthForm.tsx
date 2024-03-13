import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Title from '@components/Title'
import TextField from '@components/TextField'
import Button from '@components/Button'
import styles from './authForm.module.css'
import { AuthFormProps } from '@components/AuthForm/types'

const AuthForm: FC<AuthFormProps> = ({
  title,
  fields,
  SubmitButtonProps,
  LinkProps,
}) => {
  return (
    <div className={styles.container}>
      <Title className={styles.title}>{title}</Title>
      <form className={styles.fields}>
        {fields.map(config => (
          <TextField key={config.name} {...config} />
        ))}
      </form>
      <Button {...SubmitButtonProps} className={styles.button} />
      <NavLink {...LinkProps} className={styles.link} />
    </div>
  )
}

export default AuthForm
