import { Connection } from './connection'
import type { IItemsRepository } from './items-repository.interface'

export class ItemsRepository implements IItemsRepository {
  connection: Connection

  constructor() {
    this.connection = new Connection()
  }

  async getItems() {
    return this.connection.query('select * from items', [])
  }
}
