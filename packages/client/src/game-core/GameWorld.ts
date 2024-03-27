import { Enemy } from './Enemy'
import { GameObject } from './GameObject'
import { Platform } from './Platform'
import { Player } from './Player'
import { CanvasHeight, CanvasWidth, MsInSec } from './constants'
import { InputHandler } from './input/InputHandler'
import { Physics } from './physics/PhysicsComponent'
import { resources } from './utils/ResourcesLoader'
import { LogicError } from '@game-core/errors/common'

export class GameWorld {
    private lastLoopTime = 0
    private isGameOver = false
    private gameTime = 0
    private score = 0
    private enemies: Enemy[] = []
    private platforms: Platform[]
    private platformGround: Platform
    private player: Player
    private input: InputHandler
    private physics: Physics
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    constructor(rootElem: HTMLElement) {
        this.canvas = document.createElement('canvas')
        const ctx = this.canvas.getContext('2d')

        if (!ctx) {
            throw new LogicError('Canvas Context не найден')
        }

        this.context = ctx
        this.canvas.width = CanvasWidth
        this.canvas.height = CanvasHeight
        rootElem.appendChild(this.canvas)

        this.physics = new Physics()

        this.platforms = [new Platform([this.canvas.width / 2, 30])]
        this.platformGround = new Platform([this.canvas.width, 20])

        this.player = new Player(this.platforms[0])
        this.input = new InputHandler(this.player)

        // resources.load('player.png');
        // resources.onReady(this.init.bind(this));
        this.init()
    }

    private init() {
        this.reset()
        this.start()
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

        requestAnimationFrame(this.gameLoop.bind(this))
    }

    private update(dt: number) {
        this.gameTime += dt

        this.input.handleInput(dt)
        this.updateObjects(dt)
    }

    private updateObjects(dt: number) {
        this.player.update(dt)

        this.player.checkBounds(this.canvas)

        this.physics.checkCollisions(
            this.player,
            [this.platformGround, ...this.platforms],
            (p: Platform) => this.player.standOnPlatform(p)
        )

        this.enemies.forEach(x => x.update(dt))
    }

    private render() {
        this.clear()

        this.renderObject(this.platformGround)
        this.renderObjects(this.platforms)
        this.renderObject(this.player)
        this.renderObjects(this.enemies)
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

    private reset() {
        this.isGameOver = false
        this.gameTime = 0
        this.score = 0

        this.enemies = []

        const y = this.canvas.height - this.platformGround.height
        this.platformGround.pos = [0, y]
        const yPlat = y - this.player.height - 100
        this.platforms[0].pos = [200, yPlat]
        this.player.pos = [
            200 + this.platforms[0].width / 2,
            yPlat - this.player.height,
        ]
    }
}
