import type { Item } from './Item'

export interface ItemRepository {
  get(idItem: number): Promise<Item>
  save(item: Item): Promise<void>
  list(): Promise<Item[]>
}
