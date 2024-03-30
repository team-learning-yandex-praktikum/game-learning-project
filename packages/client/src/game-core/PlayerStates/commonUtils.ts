import { Player } from '../Player'
import { State } from '../State'
import { InputHandler } from '../input/InputHandler'

export type PlayerState = State<Player>

export function pressJump(input: InputHandler) {
    return input.pressedSpace
}

export function releasedJump(input: InputHandler) {
    return input.releasedSpace
}

export function pressJumpWithMoving(input: InputHandler) {
    return (
        (input.pressedSpace && input.pressedLeft) ||
        (input.pressedSpace && input.pressedRight)
    )
}
