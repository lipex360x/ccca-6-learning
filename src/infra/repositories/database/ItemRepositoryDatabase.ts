import { Item } from '@/domain/entity/Item'
import type { ItemRepository } from '@/domain/repository/ItemRepository'

import type { Connection } from '../../database/Connection'

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async get(idItem: number): Promise<Item> {
    throw new Error('Method not implemented.')
  }

  async save(item: Item): Promise<void> {
    const [itemData] = await this.connection.query(
      'insert into public.items (category, description, price, width, height, length, weight) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      [
        'category',
        item.description,
        item.price,
        item.dimension.width,
        item.dimension.height,
        item.dimension.length,
        item.weight,
      ],
    )

    console.log(itemData)
  }

  async list(): Promise<Item[]> {
    const itemsData = await this.connection.query(
      'select * from public.items',
      [],
    )
    const items: Item[] = []

    for (const itemData of itemsData) {
      items.push(
        new Item(itemData.id, itemData.description, parseFloat(itemData.price)),
      )
    }

    return itemsData
  }
}
