import { Indexed } from '../utils/types'
import { getKeyByCode, Keys } from './utils'

export class InputHandler {
    private pressedKeys: Indexed<boolean> = {}
    private audioContext: AudioContext
    private jumpOscillator: OscillatorNode | null = null
    private jumpGainNode: GainNode | null = null
    private gamepadIndex: number | null = 0
    private gamepadButtons: Indexed<boolean> = {}
    private wasJumpButtonPressed = false
    private isGameActive = false

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
            window.addEventListener('blur', () => {
                this.pressedKeys = {}
                this.gamepadButtons = {}
                this.stopJumpSound()
            })

            window.addEventListener('gamepadconnected', e => {
                this.gamepadIndex = e.gamepad.index
                console.log(
                    'Gamepad connected',
                    e.gamepad.index,
                    e.gamepad.id,
                    e.gamepad.buttons.length,
                    e.gamepad.axes.length
                )
            })

            window.addEventListener('gamepaddisconnected', e => {
                if (this.gamepadIndex === e.gamepad.index) {
                    this.gamepadIndex = null
                    this.gamepadButtons = {}
                }
                console.log(
                    'Gamepad disconnected',
                    e.gamepad.index,
                    e.gamepad.id
                )
            })
        }

        this.audioContext = new window.AudioContext()
        this.pollGamepad()
    }

    private setKey(e: KeyboardEvent, pressed: boolean) {
        const code = e.code
        const key = getKeyByCode(code, e.key)
        this.pressedKeys[key.toUpperCase()] = pressed
    }

    isDown(key: string) {
        return (
            this.pressedKeys[key.toUpperCase()] ||
            this.gamepadButtons[key.toUpperCase()]
        )
    }

    isUp(key: string) {
        return (
            !this.pressedKeys[key.toUpperCase()] &&
            !this.gamepadButtons[key.toUpperCase()]
        )
    }

    isSeveralDown(...k: Keys[]) {
        return k.every(key => this.pressedKeys[key])
    }

    releasedAll() {
        return Object.values(this.pressedKeys).every(pressedKey => !pressedKey)
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

    setGameActive(isActive: boolean) {
        this.isGameActive = isActive
        if (!isActive) {
            this.stopJumpSound()
        }
    }

    handleJumpSound(e: KeyboardEvent) {
        if (!this.isGameActive) {
            return
        }

        if (e.code === 'Space' && e.type === 'keydown') {
            this.playJumpSound()
        } else if (e.code === 'Space' && e.type === 'keyup') {
            this.stopJumpSound()
        }
    }

    private playJumpSound() {
        if (!this.isGameActive) {
            return
        }

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

    private pollGamepad() {
        if (this.gamepadIndex !== null) {
            const gamepad = navigator.getGamepads()[this.gamepadIndex]
            if (gamepad) {
                this.updateGamepadState(gamepad)
            }
        }
        requestAnimationFrame(this.pollGamepad.bind(this))
    }

    private updateGamepadState(gamepad: Gamepad) {
        const jumpButtonPressed = gamepad.buttons[0].pressed
        const leftPressed = gamepad.axes[0] < -0.5
        const rightPressed = gamepad.axes[0] > 0.5

        this.gamepadButtons[Keys.SPACE] = jumpButtonPressed
        this.gamepadButtons[Keys.LEFT] = leftPressed
        this.gamepadButtons[Keys.RIGHT] = rightPressed

        if (jumpButtonPressed && !this.wasJumpButtonPressed) {
            this.playJumpSound()
        } else if (!jumpButtonPressed && this.wasJumpButtonPressed) {
            this.stopJumpSound()
        }

        this.wasJumpButtonPressed = jumpButtonPressed
    }
}
