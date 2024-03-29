import { GameObject } from './GameObject'
import { GameWorld } from './GameWorld'
import { Platform } from './Platform'
import { Falling } from './PlayerStates/Falling'
import { Standing } from './PlayerStates/Standing'
import { State } from './State'
import { Gravity } from './constants'
import { InputHandler } from './input/InputHandler'
import { exists } from './utils/CommonFunc'
import { Sprite } from './utils/Sprite'
import { Vector2d } from './utils/math'

type World = GameWorld

export class Player extends GameObject {
    private currState: State<Player> = new Standing()
    private platform: Platform
    private input: InputHandler
    private world: World
    public fallPosition: number | null
    private distanceTraveled = 0

    constructor(plat: Platform, world: World) {
        super(new Sprite('player.png'))
        this.platform = plat
        this.size = [50, 120]
        this.input = new InputHandler()
        this.world = world
        this.fallPosition = null
    }

    public update(deltaTime: number): void {
        const next = this.currState.handleInput(this.input, this)
        if (exists(next)) {
            this.currState = next
            if (this.currState.enterAction) {
                this.currState.enterAction(this)
            }
        }

        this.currState.update(deltaTime, this)
    }

    public checkLandingOnPlatform(newState: () => Standing) {
        if (!this.isFalling()) {
            return
        }

        this.world.resolvePlatformCollision(this, (p: Platform) => {
            const done = this.standOnPlatform(p)
            if (done) {
                this.currState = newState()
            }
        })
    }

    public checkFallingFromPlatform(newState: () => Falling) {
        if (!this.onPlatform()) {
            this.currState = newState()
            this.speed.y = Gravity
        }
    }

    isFalling() {
        return this.speed.y > 0
    }

    getDistance() {
        return this.distanceTraveled
    }

    isEnoughJumpHigh() {
        const bottomY = this.pos[1] + this.height
        const jumpHeight = this.platform.pos[1] - bottomY
        return jumpHeight > this.height / 2
    }

    onPlatform() {
        const left = this.pos[0]
        const right = this.pos[0] + this.width
        const pleft = this.platform.pos[0]
        const pright = this.platform.pos[0] + this.platform.width

        return left < pright && right > pleft
    }

    setSpeedX(s: number) {
        this.speed.x = s
    }

    setSpeedUp(s: number) {
        this.speed.y = -s
    }

    setSpeedDown(s: number) {
        this.speed.y = s
    }

    decreaseSpeedX(s: number) {
        if (Math.abs(this.speed.x) < s) {
            return
        }

        if (this.speed.x > 0) {
            this.speed.x -= s
        } else {
            this.speed.x += s
        }
    }

    standOnPlatform(platform: Platform) {
        const bottomY = this.pos[1] + this.height
        const diffY = Math.abs(bottomY - platform.pos[1])
        const h = platform.height
        const intersectY = this.speed.y < h * 4 ? h / 4 : h * 0.8
        if (diffY < intersectY) {
            this.pos[1] = platform.pos[1] - this.height
            this.platform = platform
            return true
        }
        return false
    }

    stand(dt: number) {
        this.speed.x = 0
        this.speed.y = 0
        this.move(dt)
    }

    jump(dt: number, speedStartJump: number) {
        this.speed.y += Gravity

        if (this.speed.y > 0) {
            this.speed.y *= 1.1
        } else {
            this.speed.y *= 0.95
        }

        if (this.speed.y > speedStartJump) {
            this.speed.y = speedStartJump
        }
        this.distanceTraveled += this.calculateJumpDistance(dt)
        this.move(dt)
    }

    fall(dt: number, speedFalling: number) {
        this.speed.y += Gravity
        this.speed.y *= 1.25
        if (this.speed.y > speedFalling) {
            this.speed.y = speedFalling
        }

        this.fallPosition = this.pos[1]
        this.move(dt)
    }

    walkRight(dt: number, walkSpeed: number) {
        this.speed.x = walkSpeed
        this.speed.y = 0
        this.move(dt)
    }

    walkLeft(dt: number, walkSpeed: number) {
        this.speed.x = -walkSpeed
        this.speed.y = 0
        this.move(dt)
    }

    move(dt: number) {
        const vec = new Vector2d(this.pos)
        const pos = vec.addScaled(this.speed, dt)
        this.pos[0] = pos.getElem(0)
        this.pos[1] = pos.getElem(1)
    }

    checkBounds(canvas: HTMLCanvasElement) {
        const right = canvas.width - this.width
        if (this.pos[0] < 0) {
            this.pos[0] = 0
        } else if (this.pos[0] > right) {
            this.pos[0] = right
        }
    }

    public calculateJumpDistance(deltaTime: number): number {
        const time = deltaTime

        const distance = time

        return Math.round(distance)
    }

    public render(ctx: CanvasRenderingContext2D) {
        const x = this.pos[0]
        const y = this.pos[1]

        ctx.fillStyle = 'darkgreen'
        ctx.fillRect(0, 0, this.width, this.height)
    }
}
