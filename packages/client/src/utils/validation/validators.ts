import { ERRORS } from './errors'
import { REGEXPS } from './regexps'
import { FieldValues } from './fields'

export const checkUppercase = (value: string) =>
  value.toLowerCase() === value ? ERRORS.pattern : undefined
export const checkForIntegers = (value: string) =>
  !REGEXPS.someInteger.test(value) ? ERRORS.pattern : undefined
export const validatePassword = (value: string) =>
  checkUppercase(value) || checkForIntegers(value)
export const validateRepeatedPassword = (
  password: string,
  secondPassword: string
) => {
  return validatePassword(password) ?? password !== secondPassword
    ? ERRORS.notEquals
    : undefined
}
export const validateNewPassword = (password: string, values: FieldValues) => {
  return (
    validatePassword(password) ??
    (password === values.old_password ? ERRORS.equalsPassword : undefined)
  )
}
export const validateRepeatedNewPassword = (
  password: string,
  secondPassword: string
) => {
  return validatePassword(password) ?? password !== secondPassword
    ? ERRORS.notEquals
    : undefined
}
