import type { Item } from '../entity/Item'

export interface ItemRepository {
  get(idItem: number): Promise<Item>
  save(item: Item): Promise<void>
  list(): Promise<Item[]>
}
