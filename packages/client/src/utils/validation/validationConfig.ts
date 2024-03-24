import { FieldValues, RegisterOptions } from 'react-hook-form'
import { FIELDS } from './fields'
import { REGEXPS } from './regexps'
import {
    validateRepeatedPassword,
    validatePassword,
    validateNewPassword,
} from './validators'
import { ERRORS, getMaxLengthError, getMinLengthError } from './errors'

export type FieldValidationOptions = RegisterOptions<FieldValues, FIELDS>
export type ValidationConfig = Record<FIELDS, FieldValidationOptions>
const validationPasswordConfig = {
    minLength: { value: 8, message: getMinLengthError(8) },
    maxLength: { value: 40, message: getMaxLengthError(40) },
}

export const validationConfig: ValidationConfig = {
    [FIELDS.login]: {
        required: ERRORS.required,
        minLength: { value: 3, message: getMinLengthError(3) },
        maxLength: { value: 20, message: getMaxLengthError(20) },
        pattern: { value: REGEXPS.login, message: ERRORS.pattern },
    },
    [FIELDS.password]: {
        required: ERRORS.required,
        ...validationPasswordConfig,
        validate: validatePassword,
        deps: FIELDS.repeatPassword,
    },
    [FIELDS.repeatPassword]: {
        required: ERRORS.required,
        ...validationPasswordConfig,
        validate: (value, values) =>
            validateRepeatedPassword(value, values.password),
    },
    [FIELDS.oldPassword]: {
        required: ERRORS.required,
        ...validationPasswordConfig,
        validate: validatePassword,
    },
    [FIELDS.newPassword]: {
        required: ERRORS.required,
        ...validationPasswordConfig,
        validate: validateNewPassword,
        deps: FIELDS.newPasswordRepeat,
    },
    [FIELDS.newPasswordRepeat]: {
        required: ERRORS.required,
        ...validationPasswordConfig,
        validate: (value, values) =>
            validateRepeatedPassword(value, values.newPassword),
    },
    [FIELDS.displayName]: {
        pattern: { value: REGEXPS.name, message: ERRORS.pattern },
    },
    [FIELDS.firstName]: {
        required: ERRORS.required,
        pattern: { value: REGEXPS.name, message: ERRORS.pattern },
    },
    [FIELDS.secondName]: {
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
