import type { Order } from '@/domain/entity/Order'
import type { OrderRepository } from '@/domain/repository/OrderRepository'

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

  async count(): Promise<number> {
    return this.orders.length
  }
}
