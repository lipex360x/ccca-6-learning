import type { IItemsRepository } from './items-repository.interface'

export class FakeItemsRepository implements IItemsRepository {
  items = [
    { description: 'Guitarra', price: 1000 },
    { description: 'Guitarra', price: 1000 },
    { description: 'Guitarra', price: 1000 },
  ]

  async getItems() {
    return this.items
  }
}
