import { Player } from '../Player'
import { State } from '../State'
import { InputHandler } from '../input/InputHandler'

export type PlayerState = State<Player>

export function pressJump(input: InputHandler) {
    return input.pressedSpace
}
