import { Indexed } from '../utils/CommonTypes'
import { Keys, getKeyByCode } from './utils'

export class InputHandler {
    private pressedKeys: Indexed<boolean> = {}

    constructor() {
        document.addEventListener('keydown', e => {
            this.setKey(e, true)
        })

        document.addEventListener('keyup', e => {
            this.setKey(e, false)
        })

        if (typeof window !== 'undefined') {
            window.addEventListener('blur', e => {
                this.pressedKeys = {}
            })
        }
    }

    private setKey(e: KeyboardEvent, pressed: boolean) {
        const code = e.code
        const key = getKeyByCode(code, e.key)
        this.pressedKeys[key.toUpperCase()] = pressed
    }

    isDown(key: string) {
        return this.pressedKeys[key.toUpperCase()] === true
    }

    isUp(key: string) {
        return this.pressedKeys[key.toUpperCase()] === false
    }

    isSeveralDown(...k: Keys[]) {
        return k.every(key => this.pressedKeys[key] === true)
    }

    releasedAll() {
        return Object.values(this.pressedKeys).every(
            pressedKey => pressedKey === false
        )
    }

    get pressedRight() {
        return this.isDown(Keys.RIGHT)
    }

    get pressedLeft() {
        return this.isDown(Keys.LEFT)
    }

    get pressedLeftRight() {
        return this.pressedLeft && this.pressedRight
    }

    get releasedLeftRight() {
        return !this.pressedLeft && !this.pressedRight
    }

    get pressedSpace() {
        return this.isDown(Keys.SPACE)
    }

    get releasedSpace() {
        return this.isUp(Keys.SPACE)
    }
}
