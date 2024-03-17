import { BaseApi } from '@api/baseApi'

export class ResourcesApi extends BaseApi {
  constructor() {
    super('resources')
  }

  get = async (path: string) => {
    const { data } = await this.client.get<string>(path, {
      responseType: 'arraybuffer',
    })
    return data
  }
}
