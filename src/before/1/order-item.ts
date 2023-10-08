import { randomUUID } from 'node:crypto'

interface OrderItemProps {
  description: string
  price: number
  quantity: number
}

export class OrderItem {
  id: string
  price: number
  quantity: number

  constructor(data: OrderItemProps) {
    this.id = randomUUID()
    this.price = data.price
    this.quantity = data.quantity
  }

  total() {}
}
