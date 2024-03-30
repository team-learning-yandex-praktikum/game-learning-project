import { InputProps } from '@components/TextField/types'
import { FIELDS } from './fields'
import { FieldValidationOptions, validationConfig } from './validationConfig'

export interface FieldConfig extends Omit<InputProps, 'name' | 'label'> {
    name: FIELDS
    label: string
    options: FieldValidationOptions
}

export type FieldsConfig = Record<FIELDS, FieldConfig>

export const fieldsConfig: FieldsConfig = {
    [FIELDS.displayName]: {
        name: FIELDS.displayName,
        label: 'Никнейм',
        placeholder: 'ivan',
        options: validationConfig.login,
    },
    [FIELDS.firstName]: {
        name: FIELDS.firstName,
        label: 'Имя',
        placeholder: 'Иван',
        options: validationConfig.firstName,
    },
    [FIELDS.secondName]: {
        name: FIELDS.secondName,
        label: 'Фамилия',
        placeholder: 'Иванов',
        options: validationConfig.secondName,
    },
    [FIELDS.email]: {
        name: FIELDS.email,
        label: 'Почта',
        placeholder: 'ivan@test.ru',
        options: validationConfig.email,
    },
    [FIELDS.phone]: {
        name: FIELDS.phone,
        label: 'Телефон',
        placeholder: '+7 999 999 99 99',
        options: validationConfig.phone,
    },
    [FIELDS.login]: {
        name: FIELDS.login,
        label: 'Логин',
        placeholder: 'ivan_ivanov',
        options: validationConfig.login,
    },
    [FIELDS.password]: {
        name: FIELDS.password,
        label: 'Пароль',
        placeholder: 'qwerty',
        type: 'password',
        options: validationConfig.password,
    },
    [FIELDS.repeatPassword]: {
        name: FIELDS.repeatPassword,
        label: 'Пароль (ещё раз)',
        placeholder: 'qwerty',
        type: 'password',
        options: validationConfig.repeatPassword,
    },
    [FIELDS.oldPassword]: {
        name: FIELDS.oldPassword,
        label: 'Старый пароль',
        placeholder: 'qwerty',
        type: 'password',
        options: validationConfig.oldPassword,
    },
    [FIELDS.newPassword]: {
        name: FIELDS.newPassword,
        label: 'Новый пароль',
        placeholder: 'qwerty',
        type: 'password',
        options: validationConfig.newPassword,
    },
    [FIELDS.newPasswordRepeat]: {
        name: FIELDS.newPasswordRepeat,
        label: 'Новый пароль (еще раз)',
        placeholder: 'qwerty',
        type: 'password',
        options: validationConfig.newPasswordRepeat,
    },
}
