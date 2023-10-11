import type { CouponRepository } from '@/domain/repository/CouponRepository'

import { Order } from '../domain/entity/Order'
import type { ItemRepository } from '../domain/repository/ItemRepository'
import type { OrderRepository } from '../domain/repository/OrderRepository'

type InputDTO = {
  document: string
  orderItems: { idItem: number; quantity: number }[]
  coupon?: string
  date?: Date
}

type OutputDTO = {
  total: number
  code: string
}

export class PlaceOrder {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponRepository: CouponRepository,
  ) {}

  async execute(input: InputDTO): Promise<OutputDTO> {
    const sequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.document, input.date, sequence)

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }

    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon)
      order.addCoupon(coupon)
    }

    await this.orderRepository.save(order)

    return {
      total: order.getTotal(),
      code: order.code.value,
    }
  }
}
