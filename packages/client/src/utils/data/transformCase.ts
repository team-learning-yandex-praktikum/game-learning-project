export const capitalizeFirstLetter = (value: string): string => {
    const firstLetter = value[0].toUpperCase()
    return value.replace(value[0], firstLetter)
}

export const transformSnakeToCamelCase = (value: string): string =>
    value
        .split('_')
        .map((word, index) => (index > 0 ? capitalizeFirstLetter(word) : word))
        .join('')

export const transformCamelToSnakeCase = (value: string): string => {
    let copiedValue = value
    const countOfUpperCase = value.match(/[A-Z]/)

    countOfUpperCase?.forEach(letter => {
        copiedValue = copiedValue.replace(
            new RegExp(letter, 'g'),
            `_${letter.toLowerCase()}`
        )
    })

    return copiedValue
}

export const transformCase = {
    snakeCase(value: string, from: 'camel' = 'camel') {
        switch (from) {
            case 'camel':
            default:
                return transformCamelToSnakeCase(value)
        }
    },

    camelCase(value: string, from: 'snake' = 'snake') {
        switch (from) {
            case 'snake':
            default:
                return transformSnakeToCamelCase(value)
        }
    },
}
