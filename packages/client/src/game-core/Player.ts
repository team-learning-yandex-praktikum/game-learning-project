import { GameObject } from './GameObject'
import { GameWorld } from './GameWorld'
import { Platform } from './Platform'
import { Falling } from './PlayerStates/Falling'
import { Standing } from './PlayerStates/Standing'
import { State } from './State'
import { CanvasHeight, Gravity } from './constants'
import { InputHandler } from './input/InputHandler'
import { exists } from './utils/functions'
import { Sprite } from './utils/Sprite'
import { Vector2d } from './utils/math'
import {
    PersonIdleImg,
    PersonJumpImg,
    PersonRunLeftImg,
    PersonRunRightImg,
} from '@assets/images/game'

type World = GameWorld

export enum PlayerState {
    idle = 'idle',
    walkLeft = 'walkLeft',
    walkRight = 'walkRight',
    jump = 'jump',
    fall = 'fall',
}

const stateSprites = {
    [PlayerState.idle]: new Sprite(PersonIdleImg, {
        frames: 5,
        ticksPerFrame: 10,
    }),
    [PlayerState.jump]: new Sprite(PersonJumpImg, {
        frames: 3,
        ticksPerFrame: 20,
    }),
    [PlayerState.walkLeft]: new Sprite(PersonRunLeftImg, { frames: 7 }),
    [PlayerState.walkRight]: new Sprite(PersonRunRightImg, { frames: 7 }),
}

export class Player extends GameObject {
    private currState: State<Player> = new Standing()
    private platform: Platform
    private input: InputHandler
    private world: World
    public fallPosition: number | null
    private distanceTraveled = 0
    private highestPlatform?: Platform

    constructor(plat: Platform, world: World) {
        super()
        this.platform = plat

        this.spriteMap.set(PlayerState.idle, stateSprites[PlayerState.idle])
        this.spriteMap.set(PlayerState.fall, stateSprites[PlayerState.idle])
        this.spriteMap.set(PlayerState.jump, stateSprites[PlayerState.jump])
        this.spriteMap.set(
            PlayerState.walkRight,
            stateSprites[PlayerState.walkRight]
        )
        this.spriteMap.set(
            PlayerState.walkLeft,
            stateSprites[PlayerState.walkLeft]
        )

        this.size = [
            this.getSprite()?.width ?? 0,
            this.getSprite()?.height ?? 0,
        ]
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
            if (!done) {
                return
            }

            p.startDisappear()
            this.currState = newState()

            if ((this.highestPlatform?.pos[1] ?? CanvasHeight) > p.pos[1]) {
                this.highestPlatform = p
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
        if (this.platform.isDisappeared) {
            return false
        }
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
        this.state = PlayerState.idle
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
        this.state = PlayerState.jump
    }

    fall(dt: number, speedFalling: number) {
        this.speed.y += Gravity
        this.speed.y *= 1.25
        if (this.speed.y > speedFalling) {
            this.speed.y = speedFalling
        }

        this.fallPosition = this.pos[1]
        this.move(dt)
        this.state = PlayerState.fall
    }

    walkRight(dt: number, walkSpeed: number) {
        this.speed.x = walkSpeed
        this.speed.y = 0
        this.move(dt)
        this.state = PlayerState.walkRight
    }

    walkLeft(dt: number, walkSpeed: number) {
        this.speed.x = -walkSpeed
        this.speed.y = 0
        this.move(dt)
        this.state = PlayerState.walkLeft
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
        const platformPosY = this.highestPlatform?.pos[1] ?? CanvasHeight
        const platformHeight = this.highestPlatform?.height ?? 0
        const platformNotReached =
            this.pos[1] > platformPosY - this.height + platformHeight
        if (platformNotReached) {
            return 0
        }
        const distance = this.speed.y * deltaTime * -1
        return Math.round(distance)
    }
}
