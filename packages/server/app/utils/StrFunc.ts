import { exists } from './CommonFunc'

const emptyStr = ''
const space = ' '
const baseHex = 16

export function getUnicodeHex(s: string): string {
    if (s.length === 0) {
        return emptyStr
    }

    const codes: string[] = []

    for (const ch of s) {
        const cpoint = ch.codePointAt(0)

        if (!exists(cpoint)) {
            return emptyStr
        }

        const code = cpoint.toString(baseHex)
        codes.push(code.toUpperCase())
    }

    return codes.map(code => `#${code}`).join(space)
}

export function fromUnicodeHex(codes: string): string {
    const num = codes
        .split(space)
        .map(code => parseInt(cleanHex(code), baseHex))
    const str = String.fromCodePoint(...num)
    return str
}

function cleanHex(code: string) {
    return code.replace(/^#/, emptyStr)
}
