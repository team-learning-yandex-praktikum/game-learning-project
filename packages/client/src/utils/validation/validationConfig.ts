import { RegisterOptions } from 'react-hook-form'
import { FIELDS, FieldValues } from './fields'
import { REGEXPS } from './regexps'
import {
  validateRepeatedPassword,
  validatePassword,
  validateNewPassword,
  validateRepeatedNewPassword,
} from './validators'
import { ERRORS, getMaxLengthError, getMinLengthError } from './errors'

export type FieldValidationOptions = RegisterOptions<FieldValues, FIELDS>
export type ValidationConfig = Record<FIELDS, FieldValidationOptions>

export const validationConfig: ValidationConfig = {
  [FIELDS.login]: {
    required: ERRORS.required,
    minLength: { value: 3, message: getMinLengthError(3) },
    maxLength: { value: 20, message: getMaxLengthError(20) },
    pattern: { value: REGEXPS.login, message: ERRORS.pattern },
  },
  [FIELDS.password]: {
    required: ERRORS.required,
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
    validate: validatePassword,
    deps: FIELDS.repeat_password,
  },
  [FIELDS.repeat_password]: {
    required: ERRORS.required,
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
    validate: validateRepeatedPassword,
  },
  [FIELDS.old_password]: {
    required: ERRORS.required,
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
    validate: validatePassword,
  },
  [FIELDS.new_password]: {
    required: ERRORS.required,
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
    validate: validateNewPassword,
    deps: FIELDS.new_password_repeat,
  },
  [FIELDS.new_password_repeat]: {
    required: ERRORS.required,
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
    validate: validateRepeatedNewPassword,
  },
  [FIELDS.first_name]: {
    required: ERRORS.required,
    pattern: { value: REGEXPS.name, message: ERRORS.pattern },
  },
  [FIELDS.second_name]: {
    required: ERRORS.required,
    pattern: { value: REGEXPS.name, message: ERRORS.pattern },
  },
  [FIELDS.email]: {
    required: ERRORS.required,
    pattern: { value: REGEXPS.email, message: ERRORS.pattern },
  },
  [FIELDS.phone]: {
    required: ERRORS.required,
    minLength: { value: 10, message: getMinLengthError(10) },
    maxLength: { value: 15, message: getMaxLengthError(15) },
    pattern: { value: REGEXPS.phone, message: ERRORS.pattern },
  },
}
