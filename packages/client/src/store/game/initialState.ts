import { GameState } from '@store/game/types'
import { STATUSES } from '@store/constants'

export const gameInitialState: GameState = {
    status: STATUSES.START,
    score: 0,
}
