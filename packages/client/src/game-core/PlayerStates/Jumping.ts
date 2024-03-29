import { Player } from '../Player'
import { Standing } from './Standing'
import { Walking } from './Walking'
import { InputHandler } from '../input/InputHandler'
import { PlayerState } from './commonUtils'

export class Jumping implements PlayerState {
    private canDoubleJump = true
    private static speedStartJump = 800
    static speedXinJump = 250

    enterAction(p: Player) {
        p.decreaseSpeedX(Walking.speed / 2)
        p.setSpeedUp(Jumping.speedStartJump)
    }

    handleInput(input: InputHandler, p: Player) {
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
}
