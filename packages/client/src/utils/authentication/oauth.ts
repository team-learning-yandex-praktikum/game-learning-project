const AlphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AlphaL = 'abcdefghijklmnopqrstuvwxyz'
const Digits = '0123456789'
const ValidChars = AlphaU + AlphaL + Digits

const StateKey = 'oauth2-state-key'

function toStringFromUint8(arr: Uint8Array) {
    const arrayNumbers = Array.from<number>(arr)
    return String.fromCharCode.apply(null, arrayNumbers)
}

function numToCodepoint(n: number) {
    const pos = n % ValidChars.length
    return ValidChars.codePointAt(pos) ?? 0
}

export function generateRandomStateStr() {
    const arr = new Uint8Array(40)
    window.crypto.getRandomValues(arr)

    const codePoints = arr.map(numToCodepoint)
    const res = toStringFromUint8(codePoints)

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
