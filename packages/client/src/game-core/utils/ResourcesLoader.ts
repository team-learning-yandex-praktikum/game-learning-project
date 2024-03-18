import { Nullable } from './common-types'

type Callback = (...args: unknown[]) => void

class ResourcesLoader {
  private resourceCache: Map<string, ImgResource>
  private readyCallbacks: Callback[]

  constructor() {
    this.resourceCache = new Map()
    this.readyCallbacks = []
  }

  public load(url: string | string[]) {
    if (url instanceof Array) {
      url.forEach(_ => this.loadByURL(_))
      return
    }

    this.loadByURL(url)
  }

  public onReady(func: Callback) {
    this.readyCallbacks.push(func)
  }

  public get(url: string) {
    return this.resourceCache.get(url)
  }

  private loadByURL(url: string) {
    if (this.resourceCache.has(url)) {
      return this.resourceCache.get(url)
    }

    const onload = () => {
      this.resourceCache.set(url, img)
      if (this.isReady()) {
        this.readyCallbacks.forEach(f => f())
      }
    }

    this.resourceCache.set(url, null)

    const img = new Image()
    img.onload = onload
    img.src = `${ImgDir}${url}`
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

type ImgResource = Nullable<HTMLImageElement>
const ImgDir = '../assets/images/'

export const resources = new ResourcesLoader()
