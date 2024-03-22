import { transformCase } from './transformCase'
import { mapKeys } from 'lodash'

export const transformData = {
    to: {
        dto<T extends object, D extends object = object>(data: D): T {
            return mapKeys(data, (_, key) => transformCase.snakeCase(key)) as T
        },
    },
    from: {
        dto<T extends object, D extends object = object>(data: D): T {
            return mapKeys(data, (_, key) => transformCase.camelCase(key)) as T
        },
    },
}
