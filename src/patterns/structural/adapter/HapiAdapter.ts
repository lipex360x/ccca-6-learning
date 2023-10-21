import Hapi from '@hapi/hapi'

import type { Http } from './Http'

export class HapiAdapter implements Http {
  private server: Hapi.Server

  constructor() {
    this.server = Hapi.server({})
  }

  on(method: string, url: string, callback: any): void {
    this.server.route({
      path: url,
      method,
      handler(request: any) {
        return callback(request.params, request.body)
      },
    })
  }

  listen(port: number): void {
    this.server.settings.port = port
    this.server.start()
  }
}
