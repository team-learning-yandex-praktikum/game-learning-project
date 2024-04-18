import { GameObject } from './GameObject'
import { Sprite } from './utils/Sprite'
import { CloudImg } from '@assets/images/game'
import { Size } from './utils/GameTypes'

type PlatformType = 'ground' | 'cloud'

export class Platform extends GameObject {
    private type: PlatformType

    constructor(size: Size, type: PlatformType = 'cloud') {
        super()
        this.setSprite(new Sprite(CloudImg))
        this.size = size
        this.type = type
    }

    public update(deltaTime: number): void {
        return
    }

    public render(ctx: CanvasRenderingContext2D) {
        if (this.type === 'cloud') {
            super.render(ctx)
            return
        }

        ctx.fillStyle = 'grey'
        ctx.fillRect(0, 0, this.width, this.height)
    }
}
