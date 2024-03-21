import { GameObject } from './GameObject'
import { Sprite } from './utils/Sprite'

const sprite = new Sprite('platform.png')

export class Platform extends GameObject {
  constructor(size: Size) {
    super(sprite)
    this.size = size
  }

  public update(deltaTime: number): void {
    return
  }

  public render(ctx: CanvasRenderingContext2D) {
    const x = this.pos[0]
    const y = this.pos[1]

    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, this.width, this.height)
  }
}
