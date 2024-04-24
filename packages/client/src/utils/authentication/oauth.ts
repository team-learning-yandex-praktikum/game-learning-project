const AlphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AlphaL = 'abcdefghijklmnopqrstuvwxyz'
const Digits = '0123456789'
const ValidChars = AlphaU + AlphaL + Digits

const StateKey = 'oauth2-state-key'

function toStr(arr: Uint8Array) {
    const a = Array.from<number>(arr)
    return String.fromCharCode.apply(null, a)
}

export function generateRandomStateStr() {
    const arr = new Uint8Array(40)
    window.crypto.getRandomValues(arr)

    function cp(n: number) {
        const pos = n % ValidChars.length
        return ValidChars.codePointAt(pos) ?? 0
    }

    const cps = arr.map(cp)
    const res = toStr(cps)

    return res
}

export function saveState(state: string) {
    sessionStorage.setItem(StateKey, state)
}

export function removeState() {
    sessionStorage.removeItem(StateKey)
}

export function checkState(receivedState: string) {
    const state = sessionStorage.getItem(StateKey)
    return state === receivedState
}
