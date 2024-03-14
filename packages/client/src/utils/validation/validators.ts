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
  values: FieldValues
) => {
  return validatePassword(password) ?? password !== values.password
    ? ERRORS.notEquals
    : undefined
}
