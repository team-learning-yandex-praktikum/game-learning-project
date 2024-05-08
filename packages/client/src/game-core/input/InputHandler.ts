import { Indexed } from '../utils/CommonTypes'
import { Keys, getKeyByCode } from './utils'

export class InputHandler {
    private pressedKeys: Indexed<boolean> = {}
    private audioContext: AudioContext
    private jumpOscillator: OscillatorNode | null = null
    private jumpGainNode: GainNode | null = null

    constructor() {
        document.addEventListener('keydown', e => {
            this.setKey(e, true)
            this.handleJumpSound(e)
        })

        document.addEventListener('keyup', e => {
            this.setKey(e, false)
            this.handleJumpSound(e)
        })

        if (typeof window !== 'undefined') {
            window.addEventListener('blur', e => {
                this.pressedKeys = {}
                this.stopJumpSound()
            })
        }

        this.audioContext = new window.AudioContext()
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

    handleJumpSound(e: KeyboardEvent) {
        if (e.code === 'Space' && e.type === 'keydown') {
            this.playJumpSound()
        } else if (e.code === 'Space' && e.type === 'keyup') {
            this.stopJumpSound()
        }
    }

    private playJumpSound() {
        const oscillator = this.audioContext.createOscillator()
        const gainNode = this.audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(this.audioContext.destination)

        // Настройки звука (частота)
        oscillator.frequency.setValueAtTime(
            261.6,
            this.audioContext.currentTime
        )
        // Настроки громкомти
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)

        oscillator.start()
        this.jumpOscillator = oscillator
        this.jumpGainNode = gainNode
    }

    private stopJumpSound() {
        if (this.jumpOscillator && this.jumpGainNode) {
            this.jumpOscillator.stop()
            this.jumpOscillator.disconnect()
            this.jumpGainNode.disconnect()
        }
    }
}
