import { ERRORS } from './errors'
import { REGEXPS } from './regexps'
import { FieldValues } from 'react-hook-form'

export const checkUppercase = (value: string) =>
    value.toLowerCase() === value ? ERRORS.pattern : undefined
export const checkForIntegers = (value: string) =>
    !REGEXPS.someInteger.test(value) ? ERRORS.pattern : undefined
export const validatePassword = (value: string) =>
    checkUppercase(value) || checkForIntegers(value)
export const validateRepeatedPassword = (
    password: string,
    secondPassword: string
) =>
    validatePassword(password) ??
    (password !== secondPassword ? ERRORS.notEquals : undefined)
export const validateNewPassword = (password: string, values: FieldValues) =>
    validatePassword(password) ??
    (password === values.oldPassword ? ERRORS.equalsPassword : undefined)
