import { Enemy } from './Enemy'
import { GameObject } from './GameObject'
import { Platform } from './Platform'
import { Player } from './Player'
import {
    CanvasHeight,
    CanvasWidth,
    limitsOfLoss,
    MsInSec,
    whiteColor,
} from './constants'
import { Physics } from './physics/PhysicsComponent'
import { LogicError } from '@game-core/errors/common'
import { FinishGameHandler } from '@game-core/utils/CommonTypes'

export class GameWorld {
    private lastLoopTime = 0
    private isGameOver = false
    private gameTime = 0
    private score = 0
    private enemies: Enemy[] = []
    private platforms: Platform[] = []
    private platformGround: Platform
    private player: Player
    private physics = new Physics()
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private finishGameHandler: FinishGameHandler
    private jumpDistanceTraveled = 0
    private halfCanvasHeight = CanvasHeight / 2
    private scorePositionX = 10
    private scorePositionY = 30
    private animationFrameId: number | null = null

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

        this.platforms = [new Platform([100, 20])]
        this.platformGround = new Platform([this.canvas.width, 20], 'ground')

        this.player = new Player(this.platforms[0], this)

        this.fillPlatforms()
        this.init()
    }

    private init() {
        this.reset()
        this.start()
    }

    resolvePlatformCollision(p: Player, callback: (p: Platform) => void) {
        const allPlatforms = [this.platformGround, ...this.platforms]
        this.physics.checkCollisions(p, allPlatforms, callback)
    }

    private start() {
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
        this.gameTime += dt

        this.updateObjects(dt)

        this.halfCanvasHeight = CanvasHeight / 2
        if (this.player.pos[1] < this.halfCanvasHeight) {
            this.jumpDistanceTraveled += this.player.calculateJumpDistance(dt)
            this.scorePositionY -= this.player.calculateJumpDistance(dt)
        }
    }

    private updateObjects(dt: number) {
        this.player.update(dt)
        this.player.checkBounds(this.canvas)

        this.score = this.player.getDistance()

        this.physics.checkCollisions(
            this.player,
            [this.platformGround, ...this.platforms],
            (p: Platform) => this.player.standOnPlatform(p)
        )

        const lossLine =
            this.player.fallPosition &&
            this.player.fallPosition > limitsOfLoss.top &&
            this.player.fallPosition < limitsOfLoss.bottom

        if (lossLine && !this.player.onPlatform()) {
            this.stopGameLoop()
            this.reset()
            this.finishGame()
        }

        this.enemies.forEach(x => x.update(dt))
    }

    private render() {
        this.clear()

        this.context.save()

        if (this.player.pos[1] < this.halfCanvasHeight) {
            this.context.translate(0, this.jumpDistanceTraveled)
        }

        this.renderObject(this.platformGround)
        this.renderObjects(this.platforms)
        this.renderObject(this.player)
        this.renderObjects(this.enemies)
        this.renderScore()

        this.context.restore()
    }

    private clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private renderObjects(objects: GameObject[]) {
        objects.forEach(x => this.renderObject(x))
    }

    private renderObject(obj: GameObject) {
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

        const y = this.canvas.height - this.platformGround.height
        this.platformGround.pos = [0, y]
        const yPlat = y - this.player.height - 100
        this.platforms[0].pos = [200, yPlat]
        this.player.pos = [
            200 + this.platforms[0].width / 2,
            yPlat - this.player.height,
        ]

        this.fillPlatforms()
    }

    private fillPlatforms() {
        const numberOfPlatforms = 100
        const platformWidth = 100
        const platformHeight = 20

        const verticalGap = this.player.height + 30

        for (
            let currentPlatform = 0;
            currentPlatform < numberOfPlatforms;
            currentPlatform++
        ) {
            const platform = new Platform([platformWidth, platformHeight])
            const randomX = Math.random() * (this.canvas.width - platformWidth)
            const randomY = CanvasHeight - verticalGap * (currentPlatform + 1)

            if (currentPlatform === 0) {
                platform.pos = [randomX, CanvasHeight - verticalGap]
            } else {
                platform.pos = [randomX, randomY]
            }
            this.platforms.push(platform)
        }
    }

    private renderScore() {
        this.context.fillStyle = whiteColor
        this.context.font = '20px Arial'

        this.context.fillText(
            `Score: ${this.score}`,
            this.scorePositionX,
            this.scorePositionY
        )
    }

    private finishGame() {
        this.finishGameHandler(this.score)
    }
}
