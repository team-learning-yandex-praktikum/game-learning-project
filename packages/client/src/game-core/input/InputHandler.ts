import { Player, State } from '../Player'
import { Indexed } from '../utils/CommonTypes'

export class InputHandler {
  private player: Player
  private pressedKeys: Indexed<boolean> = {}

  constructor(obj: Player) {
    this.player = obj

    document.addEventListener('keydown', e => this.setKey(e, true))

    document.addEventListener('keyup', e => this.setKey(e, false))

    window.addEventListener('blur', e => {
      this.pressedKeys = {}
    })
  }

  private setKey(e: KeyboardEvent, pressed: boolean) {
    const code = e.code
    const key = getKeyByCode(code, e.key)
    this.pressedKeys[key.toUpperCase()] = pressed
  }

  private isDown(key: string) {
    return this.pressedKeys[key.toUpperCase()]
  }

  private isNothingDown() {
    return Object.values(this.pressedKeys).every(
      pressedKey => pressedKey === false
    )
  }

  public handleInput(deltaTime: number) {
    if (this.isNothingDown()) {
      this.player.inputState(State.Stand)
    }

    if (this.isLeft && this.isRight) {
      this.player.inputState(State.Stand)
    }

    if (this.isLeft) {
      this.player.inputState(State.WalkLeft)
    }

    if (this.isRight) {
      this.player.inputState(State.WalkRight)
    }

    if (this.isJump) {
      this.player.inputState(State.Jump)
    }
  }

  private get isRight() {
    return this.isDown(Keys.RIGHT)
  }

  private get isLeft() {
    return this.isDown(Keys.LEFT)
  }

  private get isJump() {
    return this.isDown(Keys.SPACE)
  }
}

const enum Keys {
  SPACE = 'SPACE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  UP = 'UP',
}

function getKeyByCode(code: string, defaultKey: string): string {
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
