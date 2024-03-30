export const enum Keys {
    SPACE = 'SPACE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    UP = 'UP',
}

export function getKeyByCode(code: string, defaultKey: string): string {
    switch (code) {
        case 'Space':
            return Keys.SPACE
        case 'ArrowLeft':
            return Keys.LEFT
        case 'ArrowUp':
            return Keys.UP
        case 'ArrowRight':
            return Keys.RIGHT
        case 'ArrowDown':
            return Keys.DOWN

        default:
            return defaultKey
    }
}
