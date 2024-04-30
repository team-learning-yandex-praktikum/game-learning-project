export function isEmptyObj(obj: object) {
    const keys = Object.keys(obj)
    return keys.length === 0
}

export function isEmptyStr(s: string) {
    const trimmed = s.trim()
    return trimmed.length === 0
}

export function hasKey(key: string | number, obj: object) {
    return !obj ? false : Object.hasOwn(obj, key)
}
