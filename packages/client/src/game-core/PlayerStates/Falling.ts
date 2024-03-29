import { Player } from '../Player'
import { Standing } from './Standing'
import { Walking } from './Walking'
import { Gravity } from '../constants'
import { InputHandler } from '../input/InputHandler'
import { Jumping } from './Jumping'
import { PlayerState } from './commonUtils'

export class Falling implements PlayerState {
    private static speedFalling = 500

    enterAction(p: Player) {
        p.decreaseSpeedX(Walking.speed * 0.8)
        p.setSpeedDown(Gravity)
    }

    handleInput(input: InputHandler, p: Player) {
        if (input.pressedLeft) {
            p.setSpeedX(-Jumping.speedXinJump)
        } else if (input.pressedRight) {
            p.setSpeedX(Jumping.speedXinJump)
        }
        return null
    }

    update(dt: number, p: Player) {
        p.fall(dt, Falling.speedFalling)
        p.checkLandingOnPlatform(() => new Standing())
    }
}
