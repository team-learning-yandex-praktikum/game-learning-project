export const ERRORS = {
    maxLength: 'Max length is exceeded',
    length: 'Length is incorrect',
    empty: 'Value is empty',
    notFound: 'Not found',
    cookieNotValid: 'Cookie is not valid',
}

export const getLengthError = (max: number, min?: number) => {
    const maxError = `Max: ${max}`
    const minError = min !== undefined ? `Min: ${min}` : undefined

    return [ERRORS.length, maxError, minError].filter(Boolean).join('. ')
}
