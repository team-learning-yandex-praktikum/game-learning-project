import { Nullable } from './CommonTypes'

export function exists<T>(nullable: Nullable<T>): nullable is T {
    return nullable !== null && nullable !== undefined
}
