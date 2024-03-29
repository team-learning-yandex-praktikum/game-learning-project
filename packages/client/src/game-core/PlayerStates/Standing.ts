import { Player } from '../Player'
import { InputHandler } from '../input/InputHandler'
import { Nullable } from '../utils/CommonTypes'
import { PlayerState, pressJump } from './commonUtils'
import { Jumping } from '@game-core/PlayerStates/Jumping'
import { Walking } from '@game-core/PlayerStates/Walking'

export class Standing implements PlayerState {
    handleInput(input: InputHandler, p: Player): Nullable<PlayerState> {
        if (input.pressedLeftRight) {
            return null
        }
        if (input.pressedLeft) {
            return new Walking('LeftDirection')
        }
        if (input.pressedRight) {
            return new Walking('RightDirection')
        }
        if (pressJump(input)) {
            return new Jumping()
        }
        return null
    }

    update(dt: number, p: Player) {
        p.stand(dt)
    }
}
