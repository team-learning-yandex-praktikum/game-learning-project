export class Sprite {
    private url: string
    private pos: Position = [0, 0]
    private size: Size = [0, 0]
    private speed: number
    private frames: number[]
    private index: number

    constructor(url: string, pos?: Position, size?: Size) {
        this.url = url

        if (pos) {
            this.pos = pos
        }
        if (size) {
            this.size = size
        }
        this.speed = 0
        this.frames = []
        this.index = 0
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
}
