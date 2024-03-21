import { ImgDir } from '../constants'
import { LogicError } from '../errors/common'
import { Callback } from './CommonTypes'
import { ImgResource } from './CommonTypes'

class ResourcesLoader {
  private resourceCache: Map<string, ImgResource>
  private readyCallbacks: Callback[]

  constructor() {
    this.resourceCache = new Map()
    this.readyCallbacks = []
  }

  public load(urlList: string | string[]) {
    if (urlList instanceof Array) {
      urlList.forEach(url => this.loadByURL(url))
      return
    }

    this.loadByURL(urlList)
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

class ResourceGetError extends LogicError {
  constructor(url: string) {
    super(`ресурс не был загружен (${url})`)
  }
}

export const resources = new ResourcesLoader()
export { ResourceGetError }
