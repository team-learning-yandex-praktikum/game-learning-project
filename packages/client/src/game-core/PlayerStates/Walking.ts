import { Player } from '../Player'
import { Standing } from './Standing'
import { InputHandler } from '../input/InputHandler'
import { PlayerState, pressedJump } from './commonUtils'
import { Falling } from '@game-core/PlayerStates/Falling'
import { Jumping } from '@game-core/PlayerStates/Jumping'
import { LeftDirection, RightDirection } from '@game-core/constants'

export type Direction = 'LeftDirection' | 'RightDirection'

export class Walking implements PlayerState {
    static speed = 400

    constructor(private dir: Direction) {}

    handleInput(input: InputHandler, p: Player) {
        if (input.releasedLeftRight || input.pressedLeftRight) {
            return new Standing()
        }
        if (pressedJump(input)) {
            return new Jumping()
        }
        if (input.pressedLeft) {
            this.dir = LeftDirection
        } else if (input.pressedRight) {
            this.dir = RightDirection
        }
        return null
    }

    update(dt: number, p: Player) {
        this.walk(dt, p)
        p.checkFallingFromPlatform(() => {
            const state = new Falling()
            state.enterAction(p)
            return state
        })
    }

    private walk(dt: number, p: Player) {
        if (this.dir === RightDirection) {
            p.walkRight(dt, Walking.speed)
            return
        }
        if (this.dir === LeftDirection) {
            p.walkLeft(dt, Walking.speed)
            return
        }
    }
}
