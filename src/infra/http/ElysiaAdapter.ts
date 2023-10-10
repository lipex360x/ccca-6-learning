import Elysia from 'elysia'

import type { Http } from './Http'

export class ElysiaAdapter implements Http {
  app: Elysia

  constructor() {
    this.app = new Elysia()
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async ({ params, body }) => {
      const output = await callback(params, body)

      return output
    })
  }

  listen(port: number): void {
    this.app.listen(port)
  }
}
