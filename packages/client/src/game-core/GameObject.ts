import { Sprite } from './utils/Sprite'
import { Vector2d } from './utils/math'

type SpriteMap = Map<string, Sprite>

export abstract class GameObject {
    protected position: Position = [0, 0]
    protected size: Size = [0, 0]
    protected spriteMap: SpriteMap = new Map()
    protected speed = Vector2d.zero
    protected state = 'idle'

    getState() {
        return this.state
    }

    get pos() {
        return this.position
    }

    set pos(v: Position) {
        this.position = v
    }

    get width() {
        return this.size[0]
    }

    get height() {
        return this.size[1]
    }

    getSprite(state = 'idle') {
        return this.spriteMap.get(state)
    }

    setSprite(sprite: Sprite) {
        this.spriteMap.set('idle', sprite)
    }

    public abstract update(deltaTime: number): void

    public render(ctx: CanvasRenderingContext2D) {
        this.spriteMap.get(this.state)?.render(ctx)
    }
}
