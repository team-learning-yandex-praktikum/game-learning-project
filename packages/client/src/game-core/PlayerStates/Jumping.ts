import { Player } from '../Player'
import { Standing } from './Standing'
import { Walking } from './Walking'
import { InputHandler } from '../input/InputHandler'
import {
    PlayerState,
    pressedJump,
    pressedJumpWithMoving,
    releasedJump,
} from './commonUtils'

export class Jumping implements PlayerState {
    private canDoubleJump = true
    private wasReleasedJump = false
    private static speedStartJump = 900
    static speedXinJump = 250

    enterAction(p: Player) {
        p.decreaseSpeedX(Walking.speed / 2)
        p.setSpeedUp(Jumping.speedStartJump)
        this.canDoubleJump = true
    }

    handleInput(input: InputHandler, p: Player) {
        if (releasedJump(input)) {
            this.wasReleasedJump = true
        }
        if (pressedJump(input) || pressedJumpWithMoving(input)) {
            this.doubleJump(p)
        }
        if (input.releasedLeftRight || input.pressedLeftRight) {
            p.setSpeedX(0)
        } else if (input.pressedLeft) {
            p.setSpeedX(-Jumping.speedXinJump)
        } else if (input.pressedRight) {
            p.setSpeedX(Jumping.speedXinJump)
        }
        return null
    }

    update(dt: number, p: Player) {
        p.jump(dt, Jumping.speedStartJump)
        p.checkLandingOnPlatform(() => new Standing())
    }

    private doubleJump(p: Player) {
        if (!this.canDoubleJump) {
            return
        }
        if (!this.wasReleasedJump) {
            return
        }
        if (p.isFalling()) {
            return
        }
        if (p.isEnoughJumpHigh()) {
            this.canDoubleJump = false
            p.decreaseSpeedX(Walking.speed / 2)
            p.setSpeedUp(Jumping.speedStartJump)
        }
    }
}
