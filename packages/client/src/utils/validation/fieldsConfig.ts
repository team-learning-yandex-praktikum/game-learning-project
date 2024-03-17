import { InputProps } from '@components/TextField/types'
import { FIELDS } from './fields'
import { FieldValidationOptions, validationConfig } from './validationConfig'

export interface FieldConfig extends Omit<InputProps, 'name'> {
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
}
