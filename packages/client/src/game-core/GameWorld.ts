import { Enemy } from './Enemy'
import { GameObject } from './GameObject'
import { Platform } from './Platform'
import { Player, PlayerState } from './Player'
import {
    CanvasHeight,
    CanvasWidth,
    MsInSec,
    overlayColor,
    textColor,
} from './constants'
import { Physics } from './physics/PhysicsComponent'
import { LogicError } from './errors/common'
import { FinishGameHandler } from './utils/types'
import {
    getRandomInt,
    getRandomNumbers,
    limitNumberByMax,
    limitNumberByMin,
} from './utils/functions'

export class GameWorld {
    private lastLoopTime = 0
    private isGameOver = false
    private gameTime = 0
    private score = 0
    private enemies: Enemy[] = []
    private platforms: Platform[] = []
    private platformGround: Platform | null
    private player: Player | null
    private physics: Physics | null = new Physics()
    private canvas: HTMLCanvasElement | null
    private context: CanvasRenderingContext2D | null
    private finishGameHandler: FinishGameHandler
    private jumpDistanceTraveled = 0
    private scorePositionX = 10
    private topPositionY = 0
    private animationFrameId: number | null = null
    private platformsIncrement = 30

    constructor(rootElem: HTMLElement, finishGameHandler: FinishGameHandler) {
        this.canvas = document.createElement('canvas')
        this.finishGameHandler = finishGameHandler
        const ctx = this.canvas.getContext('2d')

        if (!ctx) {
            throw new LogicError('Canvas Context не найден')
        }
        this.score = 0
        this.context = ctx
        this.canvas.width = CanvasWidth
        this.canvas.height = CanvasHeight
        rootElem.appendChild(this.canvas)

        this.platformGround = new Platform([this.canvas.width, 20], 'ground')
        this.player = new Player(this.platformGround, this)

        this.init()
    }

    private init() {
        this.reset()
        this.start()
    }

    public get allPlatforms() {
        return [this.platformGround, ...this.platforms].filter(
            Boolean
        ) as Platform[]
    }

    resolvePlatformCollision(p: Player, callback: (p: Platform) => void) {
        this.physics?.checkCollisions(p, this.allPlatforms, callback)
    }

    private start() {
        this.stopGameLoop()
        this.lastLoopTime = performance.now()
        this.gameLoop()
    }

    private gameLoop() {
        const now = performance.now()
        const dt = (now - this.lastLoopTime) / MsInSec

        this.update(dt)
        this.render()
        this.lastLoopTime = now
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this))
    }

    private update(dt: number) {
        if (!this.player) {
            return
        }
        this.gameTime += dt
        this.updateObjects(dt)

        const isJump = this.player?.getState() === PlayerState.jump
        if (isJump) {
            const distance = this.player?.calculateJumpDistance(dt)
            this.jumpDistanceTraveled += distance
            this.topPositionY -= distance
        }
    }

    private updateObjects(dt: number) {
        if (!this.canvas || !this.player) {
            return
        }
        this.player.update(dt)
        this.player.checkBounds(this.canvas)

        if (this.player.getDistance() > this.score) {
            this.score = this.player.getDistance()
        }

        this.resolvePlatformCollision(this.player, (p: Platform) =>
            this.player?.standOnPlatform(p)
        )

        this.enemies.forEach(x => x.update(dt))

        this.checkLossLine()
        this.fillPlatforms()
    }

    private checkLossLine = () => {
        if (!this.player) {
            return
        }
        const lossLine =
            this.player.pos[1] + this.player.height / 2 >
            this.topPositionY + CanvasHeight

        if (lossLine && !this.player.onPlatform()) {
            this.finishGame()
        }
    }

    private render() {
        this.clear()

        if (!this.context || !this.player) {
            return
        }

        this.context.save()
        this.context.translate(0, this.jumpDistanceTraveled)

        this.platforms = this.platforms.filter(
            platform => !platform.isDisappeared
        )

        this.renderObject(this.platformGround)
        this.renderObjects(this.platforms)
        this.renderObject(this.player)
        this.renderObjects(this.enemies)
        this.renderScore()

        this.context.restore()
    }

    private clear() {
        if (!this.canvas) {
            return
        }
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private renderObjects(objects: GameObject[]) {
        objects.forEach(x => this.renderObject(x))
    }

    private renderObject(obj: GameObject | null) {
        if (!obj || !this.context) {
            return
        }

        this.context.save()
        const x = obj.pos[0]
        const y = obj.pos[1]
        this.context.translate(x, y)
        obj.render(this.context)
        this.context.restore()
    }

    private stopGameLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
        }
    }

    private reset() {
        this.isGameOver = false
        this.gameTime = 0

        this.enemies = []

        if (!this.platformGround || !this.canvas || !this.player) {
            return
        }

        const y = this.canvas.height - this.platformGround.height
        this.platformGround.pos = [0, y]

        this.player.pos = [
            this.platformGround.width / 2,
            this.platformGround.pos[1] - this.player.height,
        ]

        this.fillPlatforms()
    }

    private get needMorePlatforms() {
        if (!this.platforms.length || !this.canvas) {
            return true
        }
        const lastY = this.platforms[this.platforms.length - 1].pos[1]
        return this.topPositionY - this.canvas.height < lastY
    }

    private fillPlatforms() {
        if (!this.canvas || !this.player || !this.needMorePlatforms) {
            return
        }

        const startedPlatform = this.platforms.length
        const numberOfPlatforms =
            this.platforms.length + this.platformsIncrement
        const platformWidth = 100
        const platformHeight = 20
        const limit = 400

        const verticalGap = this.player.height + 50

        const shouldDisappearIndexes = getRandomNumbers(
            startedPlatform,
            numberOfPlatforms
        )

        for (
            let currentPlatform = startedPlatform;
            currentPlatform < numberOfPlatforms;
            currentPlatform++
        ) {
            const platform = new Platform([platformWidth, platformHeight])

            platform.shouldDisappear =
                shouldDisappearIndexes.includes(currentPlatform)

            const prevX =
                (currentPlatform
                    ? this.platforms[currentPlatform - 1].pos[0]
                    : this.canvas.width / 2) -
                platformWidth / 2
            const prevY = currentPlatform
                ? this.platforms[currentPlatform - 1].pos[1]
                : verticalGap

            const leftEdge = limitNumberByMin(prevX - limit)
            const rightEdge = limitNumberByMax(
                prevX + limit,
                this.canvas.width - platformWidth
            )

            const randomX = getRandomInt(leftEdge, rightEdge)
            const randomY = currentPlatform
                ? prevY - verticalGap
                : this.canvas.height - verticalGap

            platform.pos = [randomX, randomY]
            this.platforms.push(platform)
        }
    }

    private renderScore() {
        if (!this.context) {
            return
        }
        this.context.fillStyle = overlayColor
        this.context.fillRect(
            this.scorePositionX - 20,
            this.topPositionY,
            200,
            50
        )
        this.context.fillStyle = textColor
        this.context.font = '20px Arial'

        this.context.fillText(
            `Score: ${this.score}`,
            this.scorePositionX,
            this.topPositionY + 30
        )
    }

    private cleanup = () => {
        this.player = null
        this.isGameOver = true
        this.canvas = null
        this.context = null
        this.enemies = []
        this.gameTime = 0
        this.jumpDistanceTraveled = 0
        this.physics = null
        this.platformGround = null
        this.platforms = []
        this.score = 0
    }

    private finishGame() {
        this.stopGameLoop()
        this.finishGameHandler(this.score)
        this.cleanup()
    }
}
