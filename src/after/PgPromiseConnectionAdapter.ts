import pgp from 'pg-promise'

import type { Connection } from './Connection'

export class PgPromiseConnectionAdapter implements Connection {
  pgp: any

  constructor() {
    this.pgp = pgp()('postgres://postgres:docker@localhost:5432/app')
  }

  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params)
  }
}
