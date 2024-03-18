import { BaseApi } from '@api/baseApi'

export class ResourcesApi extends BaseApi {
  constructor() {
    super('resources')
  }

  get = async (path: string) => {
    const { data } = await this.client.get<string>(path, {
      responseType: 'arraybuffer',
    })
    const blob = new Blob([data])
    const imageUrl = URL.createObjectURL(blob)

    return imageUrl
  }
}

export const resourcesApi = new ResourcesApi()
