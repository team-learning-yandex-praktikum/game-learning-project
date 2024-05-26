import { GameObject } from './GameObject'
import { InputHandler } from './input/InputHandler'
import { Nullable } from './utils/types'

export interface State<T extends GameObject> {
    handleInput(input: InputHandler, obj: T): Nullable<State<T>>
    update(deltaTime: number, obj: T): void
    enterAction?(obj: T): void
    exitAction?(obj: T): void
}
