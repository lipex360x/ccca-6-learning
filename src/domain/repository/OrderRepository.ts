import type { Order } from '../entity/Order'

export interface OrderRepository {
  save(order: Order): Promise<void>
  count(): Promise<number>
  get(code: string): Promise<Order>
  list(): Promise<Order[]>
  clear(): Promise<void>
}
