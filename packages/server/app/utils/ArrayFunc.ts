type KeyGetter<Elem, Key> = (e: Elem) => Key

export function groupBy<Elem, Key>(
    arr: Elem[],
    keyGetter: KeyGetter<Elem, Key>
): Map<Key, Elem> {
    const map = new Map()

    arr.forEach(e => {
        const key = keyGetter(e)
        const group = map.get(key)
        if (!group) {
            map.set(key, [e])
        } else {
            group.push(e)
        }
    })

    return map
}
