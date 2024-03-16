import { TextFieldProps } from '@components/TextField/types'
import { FIELDS } from './fields'
import { FieldValidationOptions, validationConfig } from './validationConfig'

export interface FieldConfig extends Omit<TextFieldProps, 'name'> {
  name: FIELDS
  options: FieldValidationOptions
}
export type FieldsConfig = Record<FIELDS, FieldConfig>

export const fieldsConfig: FieldsConfig = {
  [FIELDS.first_name]: {
    name: FIELDS.first_name,
    label: 'Имя',
    placeholder: 'Иван',
    options: validationConfig.first_name,
  },
  [FIELDS.second_name]: {
    name: FIELDS.second_name,
    label: 'Фамилия',
    placeholder: 'Иванов',
    options: validationConfig.second_name,
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
  [FIELDS.repeat_password]: {
    name: FIELDS.repeat_password,
    label: 'Пароль (ещё раз)',
    placeholder: 'qwerty',
    type: 'password',
    options: validationConfig.repeat_password,
  },
  [FIELDS.old_password]: {
    name: FIELDS.old_password,
    label: 'Старый пароль',
    placeholder: 'qwerty',
    type: 'password',
    options: validationConfig.old_password,
  },
  [FIELDS.new_password]: {
    name: FIELDS.new_password,
    label: 'Новый пароль',
    placeholder: 'qwerty',
    type: 'password',
    options: validationConfig.new_password,
  },
  [FIELDS.new_password_repeat]: {
    name: FIELDS.new_password_repeat,
    label: 'Новый пароль (еще раз)',
    placeholder: 'qwerty',
    type: 'password',
    options: validationConfig.new_password_repeat,
  },
}
