import { randomUUID } from 'node:crypto'

import { COUPONS } from './cupouns'
import type { OrderItem } from './order-item'

interface OrderProps {
  id: string
  document: string
  items: OrderItem[]
}

export class Order {
  private orderItems: OrderProps[] = []
  private id: string

  constructor(readonly document: string) {
    this.id = randomUUID()
  }

  create(items: OrderItem[]) {
    const orderItem = { id: this.id, document: this.document, items }
    this.orderItems.push(orderItem)
    return orderItem
  }

  total(orderId: string) {
    const order = this.orderItems.find((order) => order.id === orderId)

    const totalPrice = order.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    return totalPrice
  }

  totalWithDiscount(orderId: string, coupon: keyof typeof COUPONS) {
    return this.total(orderId) - this.total(orderId) * COUPONS[coupon]
  }
}
