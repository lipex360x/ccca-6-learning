import type { Connection } from './Connection'
import { Item } from './Item'
import type { ItemRepository } from './ItemRepository'

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async get(idItem: number): Promise<Item> {
    throw new Error('Method not implemented.')
  }

  async save(item: Item): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async list(): Promise<Item[]> {
    const itemsData = await this.connection.query('select * from items', [])
    const items: Item[] = []

    for (const itemData of itemsData) {
      items.push(
        new Item(itemData.id, itemData.description, parseFloat(itemData.price)),
      )
    }

    return itemsData
  }
}
