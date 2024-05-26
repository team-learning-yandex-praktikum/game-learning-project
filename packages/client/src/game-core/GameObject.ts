import { Sprite } from './utils/Sprite'
import { Vector2d } from './utils/math'
import { Position, Size } from './utils/gameTypes'

type SpriteMap = Map<string, Sprite>

/** Функция генерирует 5 диапазонов от 0 до max.
 * Каждый последующий диапазон меньше предыдущего.
 * Между диапазонами есть разрывы */
function generateDescendRanges(max: number) {
    const maxRanges = 10 // Максимальное количество диапазонов
    const ranges: number[][] = []

    for (let i = 0; i < maxRanges; i++) {
        const start = i === 0 ? max : Math.ceil(ranges[i - 1][1] + 1)
        const end = Math.ceil(max * Math.pow(1 - (i + 1) / maxRanges, 2)) // Уменьшение по квадратной функции

        // Добавляем диапазон в массив
        ranges.push([start, Math.min(end, max)])

        // Если достигли конца, выходим из цикла
        if (ranges[i][1] >= max) {
            break
        }
    }

    return ranges
        .filter((_, i) => i % 2 === 0)
        .map(range => [max - range[0], max - range[1]])
}

/** Функция возвращает false, если рендерить компонент не нужно */
const checkBlinking = (deltaTime: number, ranges: number[][]) =>
    ranges.some(range => deltaTime >= range[0] && deltaTime < range[1])

export abstract class GameObject {
    protected position: Position = [0, 0]
    protected size: Size = [0, 0]
    protected spriteMap: SpriteMap = new Map()
    protected speed = Vector2d.zero
    protected state = 'idle'

    public shouldDisappear = false
    private disappearingTime = 1500
    private disappearStartTime: number | null = null
    public isDisappeared = false
    private blinkRanges: number[][] = []

    getState() {
        return this.state
    }

    get pos() {
        return this.position
    }

    set pos(v: Position) {
        this.position = v
    }

    get width() {
        return this.size[0]
    }

    get height() {
        return this.size[1]
    }

    getSprite(state = 'idle') {
        return this.spriteMap.get(state)
    }

    setSprite(sprite: Sprite) {
        this.spriteMap.set('idle', sprite)
    }

    public abstract update(deltaTime: number): void

    public render(ctx: CanvasRenderingContext2D) {
        this.spriteMap.get(this.state)?.render(ctx)
    }

    startDisappear() {
        if (!this.shouldDisappear || this.disappearStartTime) {
            return
        }
        this.disappearStartTime = performance.now()
        this.blinkRanges = generateDescendRanges(this.disappearingTime)
    }

    renderDisappear(render: () => void) {
        if (this.disappearStartTime) {
            const deltaTime = performance.now() - this.disappearStartTime
            if (this.disappearingTime < deltaTime) {
                this.isDisappeared = true
                this.disappearStartTime = null
                return
            }

            if (checkBlinking(deltaTime, this.blinkRanges)) {
                render()
            }
            return
        }

        render()
    }
}
