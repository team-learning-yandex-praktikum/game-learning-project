import { resources } from '@game-core/utils/ResourcesLoader'
import { ImgResource } from '@game-core/utils/CommonTypes'
import { Position, Size } from './GameTypes'

interface SpriteOptions {
    frames?: number
    position?: Position
    size?: Size
    ticksPerFrame?: number
}

export class Sprite {
    private url: string
    private position: Position
    private size: Size = [0, 0]
    private speed: number
    private frames: number
    private index: number
    public image?: ImgResource
    private ticksPerFrame = 3
    private tickCount = 0

    constructor(url: string, options: SpriteOptions = {}) {
        const {
            position = [0, 0],
            size,
            frames = 1,
            ticksPerFrame = 2,
        } = options

        this.url = url
        this.position = position
        this.frames = frames
        this.ticksPerFrame = ticksPerFrame
        this.speed = 0
        this.index = 0

        this.initImage(size)
    }

    async initImage(size?: Size) {
        await resources.load(this.url)
        this.image = resources.get(this.url)
        const imgWidth = this.image?.width ?? 0
        const imgHeight = this.image?.height ?? 0

        if (size) {
            this.size = size
        } else {
            const frameWidth = imgWidth / this.frames
            this.size = [frameWidth, imgHeight]
        }
    }

    get width() {
        return this.size[0]
    }

    get height() {
        return this.size[1]
    }

    public getUrl() {
        return this.url
    }

    public resetIndex() {
        this.index = 0
    }

    public update() {
        if (this.frames <= 1) {
            return
        }

        this.tickCount++

        if (this.tickCount <= this.ticksPerFrame) {
            return
        }

        this.tickCount = 0

        if (this.index < this.frames - 1) {
            this.index++
        } else {
            this.resetIndex()
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        if (!this.image) {
            return
        }

        this.update()

        const sx = this.index * this.width

        ctx.drawImage(
            this.image,
            sx,
            0,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
        )
    }
}
