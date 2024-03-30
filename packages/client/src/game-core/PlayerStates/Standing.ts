import { LeftDirection, RightDirection } from '@game-core/constants'
import { Player } from '../Player'
import { InputHandler } from '../input/InputHandler'
import { Nullable } from '../utils/CommonTypes'
import { PlayerState, pressedJump } from './commonUtils'
import { Jumping } from '@game-core/PlayerStates/Jumping'
import { Walking } from '@game-core/PlayerStates/Walking'

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
    }
}
