import { Order } from '../domain/entity/Order'
import type { ItemRepository } from '../domain/repository/ItemRepository'
import type { OrderRepository } from '../domain/repository/OrderRepository'

type InputDTO = {
  document: string
  orderItems: { idItem: number; quantity: number }[]
  coupon?: string
}

type OutputDTO = {
  total: number
}

export class PlaceOrder {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(input: InputDTO): Promise<OutputDTO> {
    const order = new Order(input.document)

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }

    await this.orderRepository.save(order)

    const total = order.getTotal()
    return { total }
  }
}
