import { LeftDirection, RightDirection } from '@game-core/constants'
import { Player } from '../Player'
import { InputHandler } from '../input/InputHandler'
import { Nullable } from '../utils/types'
import { PlayerState, pressedJump } from './commonUtils'
import { Jumping } from './Jumping'
import { Walking } from './Walking'
import { Falling } from './Falling'

export class Standing implements PlayerState {
    handleInput(input: InputHandler, p: Player): Nullable<PlayerState> {
        if (input.pressedLeftRight) {
            return null
        }
        if (input.pressedLeft) {
            return new Walking(LeftDirection)
        }
        if (input.pressedRight) {
            return new Walking(RightDirection)
        }
        if (pressedJump(input)) {
            return new Jumping()
        }
        return null
    }

    update(dt: number, p: Player) {
        p.stand(dt)
        p.checkFallingFromPlatform(() => {
            const state = new Falling()
            state.enterAction(p)
            return state
        })
    }
}
