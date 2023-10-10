import invariant from 'tiny-invariant'

import type { Item } from '@/domain/entity/Item'
import type { ItemRepository } from '@/domain/repository/ItemRepository'

export class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor() {
    this.items = []
  }

  async get(idItem: number): Promise<Item> {
    const item = this.items.find((item) => item.idItem === idItem)
    invariant(item, 'Item not found')
    return item
  }

  async save(item: Item): Promise<void> {
    this.items.push(item)
  }

  async list(): Promise<Item[]> {
    return this.items
  }
}
