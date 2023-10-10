import type { Order } from './Order'
import type { OrderRepository } from './OrderRepository'

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }
}
