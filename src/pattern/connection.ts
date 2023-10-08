import pgp from 'pg-promise'

export class Connection {
  pgp: any
  constructor() {
    this.pgp = pgp()('postgres://postgres:docker@localhost:5432/app')
  }

  query(statement: string, paramenters: any) {
    return this.pgp.query(statement, paramenters)
  }
}
