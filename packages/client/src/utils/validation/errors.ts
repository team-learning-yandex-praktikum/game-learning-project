export const ERRORS = {
  required: 'Обязательное поле',
  minLength: 'Минимальное количество символов',
  maxLength: 'Максимальное количество символов',
  pattern: 'Неверный формат',
  notEquals: 'Введенные поля не совпадают',
  equalsPassword: 'Пароли совпадают',
}

export const AUTH_ERRORS = {
  authenticated: 'User already in system',
}

export const getMinLengthError = (value: number) => {
  return `${ERRORS.minLength} - ${value}`
}

export const getMaxLengthError = (value: number) => {
  return `${ERRORS.maxLength} - ${value}`
}
