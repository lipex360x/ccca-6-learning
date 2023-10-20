import type { Request, Response, Express } from 'express'
import express from 'express'

import type { Http } from './Http'

export class ExpressAdapter implements Http {
  private app: Express

  constructor() {
    this.app = express()
  }

  private parseUrl(url: string) {
    return url.replace(/\{/g, ':').replace(/\}/g, '')
  }

  on(method: string, url: string, callback: any) {
    this.app[method](
      this.parseUrl(url),
      async (req: Request, res: Response) => {
        const output = await callback(req.params, req.body)
        return res.json(output)
      },
    )
  }

  listen(port: number) {
    return this.app.listen(port)
  }
}
