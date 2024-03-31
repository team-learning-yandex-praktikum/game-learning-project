import { LogicError } from '../errors/common'
import { Callback, ImgResource } from './CommonTypes'

class ResourcesLoader {
    private resourceCache: Map<string, ImgResource>
    private readyCallbacks: Callback[]

    constructor() {
        this.resourceCache = new Map()
        this.readyCallbacks = []
    }

    public async load(urlList: string | string[]) {
        if (urlList instanceof Array) {
            const loadPromises = urlList.map(url => this.loadByURL(url))
            return await Promise.all(loadPromises)
        }

        return await this.loadByURL(urlList)
    }

    public onReady(func: Callback) {
        this.readyCallbacks.push(func)
    }

    public get(url: string) {
        return this.resourceCache.get(url)
    }

    private loadByURL(url: string): Promise<ImgResource> {
        return new Promise((resolve, reject) => {
            if (this.resourceCache.has(url)) {
                resolve(this.resourceCache.get(url))
            }

            const img = new Image()

            img.onload = () => {
                this.resourceCache.set(url, img)
                resolve(img)
                if (this.isReady()) {
                    this.readyCallbacks.forEach(f => f())
                }
            }
            img.onerror = reject
            img.src = url
        })
    }

    private isReady() {
        const keys = this.resourceCache.keys()
        let ready = true
        for (const k in keys) {
            if (this.resourceCache.get(k) === null) {
                ready = false
            }
        }
        return ready
    }
}

class ResourceGetError extends LogicError {
    constructor(url: string) {
        super(`ресурс не был загружен (${url})`)
    }
}

export const resources = new ResourcesLoader()
export { ResourceGetError }
