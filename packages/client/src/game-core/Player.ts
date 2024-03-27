import { GameObject } from './GameObject'
import { Platform } from './Platform'
import { Gravity } from './constants'
import { Sprite } from './utils/Sprite'
import { Vector2d } from './utils/math'

export const enum State {
    Stand = 'Stand',
    WalkLeft = 'WalkLeft',
    WalkRight = 'WalkRight',
    Jump = 'Jump',
    Fall = 'Fall',
}

export class Player extends GameObject {
    private currState = State.Stand
    private nextState = State.Stand
    private walkSpeed: number
    private jumpSpeed: number
    private moveInJumpSpeed: number
    private platform: Platform
    private canDoubleJump = true
    private onGround = true

    constructor(plat: Platform) {
        super(new Sprite('player.png'))
        this.platform = plat
        this.size = [50, 120]
        this.walkSpeed = 400
        this.jumpSpeed = 800
        this.moveInJumpSpeed = 150
    }

    public inputState(s: State) {
        this.nextState = s
    }

    public update(deltaTime: number): void {
        switch (this.currState) {
            case State.Stand:
                this.onGround = true
                this.updateStand()
                break

            case State.WalkLeft:
            case State.WalkRight:
                if (!this.onPlatform()) {
                    this.onGround = false
                    this.currState = State.Fall
                    this.speed.x = 0
                    this.speed.y = Gravity
                } else {
                    this.onGround = true
                    this.updateWalk(deltaTime)
                }
                break

            case State.Jump:
                this.canDoubleJump = true
                this.onGround = false
                this.updateJump(deltaTime)
                break

            case State.Fall:
                this.onGround = false
                this.moveInAir(deltaTime)
                this.fall(deltaTime)
                break
        }
    }

    private isWalkNext() {
        return (
            this.nextState === State.WalkLeft ||
            this.nextState === State.WalkRight
        )
    }

    private updateStand() {
        this.stand()

        if (this.isWalkNext()) {
            this.currState = this.nextState
            return
        }

        if (this.nextState === State.Jump) {
            this.currState = State.Jump
            this.speed.y = -this.jumpSpeed
            return
        }
    }

    private updateWalk(dt: number) {
        this.speed.y = 0

        this.walk(dt)

        if (this.nextState === State.Stand) {
            this.currState = State.Stand
            return
        }

        if (this.isWalkNext()) {
            this.currState = this.nextState
            return
        }

        if (this.nextState === State.Jump) {
            this.currState = State.Jump
            this.speed.x = this.walkSpeed / 2
            this.speed.y = -this.jumpSpeed
            return
        }
    }

    private updateJump(dt: number) {
        this.moveInAir(dt)
        this.jump(dt)

        if (this.nextState === State.Jump) {
            this.jumpDouble(dt)
        }
    }

    private jumpDouble(dt: number) {
        if (this.canDoubleJump) {
            this.canDoubleJump = false
            this.speed.y = -this.jumpSpeed
        }
    }

    standOnPlatform(p: Platform) {
        if (this.currState !== State.Jump && this.currState !== State.Fall) {
            return
        }

        const bottomY = this.pos[1] + this.height

        if (this.speed.y > 0 && bottomY >= p.pos[1]) {
            this.pos[1] = p.pos[1] - this.height
            this.currState = State.Stand
            this.platform = p
        }
    }

    onPlatform() {
        const left = this.pos[0]
        const right = this.pos[0] + this.width
        const pleft = this.platform.pos[0]
        const pright = this.platform.pos[0] + this.platform.width

        return left < pright && right > pleft
    }

    stand() {
        this.speed.x = 0
        this.speed.y = 0
    }

    jump(dt: number) {
        this.speed.y += Gravity

        if (this.speed.y > 0) {
            this.speed.y *= 1.1
        } else {
            this.speed.y *= 0.95
        }

        if (this.speed.y >= this.jumpSpeed) {
            this.speed.y = this.jumpSpeed
        }

        this.move(dt)
    }

    fall(dt: number) {
        this.speed.y += Gravity
        this.speed.y *= 1.25
        if (this.speed.y >= this.jumpSpeed) {
            this.speed.y = this.jumpSpeed
        }

        this.move(dt)
    }

    walk(dt: number) {
        if (this.currState === State.WalkRight) {
            this.speed.x = this.walkSpeed
        }

        if (this.currState === State.WalkLeft) {
            this.speed.x = -this.walkSpeed
        }

        this.move(dt)
    }

    moveInAir(dt: number) {
        if (this.nextState === State.WalkRight) {
            this.speed.x = this.moveInJumpSpeed
        }

        if (this.nextState === State.WalkLeft) {
            this.speed.x = -this.moveInJumpSpeed
        }
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

    // jumpDown() {
    // }

    public render(ctx: CanvasRenderingContext2D) {
        const x = this.pos[0]
        const y = this.pos[1]

        ctx.fillStyle = 'darkgreen'
        ctx.fillRect(0, 0, this.width, this.height)
    }
}
