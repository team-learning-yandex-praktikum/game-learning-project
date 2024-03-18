import { Physics } from './physics/PhysicsComponent'
import { resources } from './utils/ResourcesLoader'
import { Sprite } from './utils/Sprite'
import { Nullable } from './utils/common-types'
import { Vector2d } from './utils/math'

export abstract class GameObject {
  protected physics: Nullable<Physics>
  protected position: Position = [0, 0]
  protected size: Size = [0, 0]
  protected sprite: Sprite
  protected speed = Vector2d.zero

  constructor(sprite: Sprite, phys?: Physics) {
    this.sprite = sprite
    this.physics = phys
  }

  get pos() {
    return this.position
  }

  set pos(v: Position) {
    this.position = v
  }

  // get width() {
  //   return this.sprite.width;
  // }

  // get height() {
  //   return this.sprite.height;
  // }

  get width() {
    return this.size[0]
  }

  get height() {
    return this.size[1]
  }

  public abstract update(deltaTime: number): void

  public render(ctx: CanvasRenderingContext2D) {
    const url = this.sprite.getUrl()
    const img = resources.get(url)!
    const x = this.pos[0]
    const y = this.pos[1]

    ctx.drawImage(
      img,
      x,
      y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    )
  }
}
