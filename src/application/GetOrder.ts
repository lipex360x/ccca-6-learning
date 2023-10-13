import type { OrderRepository } from '@/domain/repository/OrderRepository'

type OutputDTO = {
  code: string
  total: number
}

export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(code: string): Promise<OutputDTO> {
    const order = await this.orderRepository.get(code)

    return { code: order.code.value, total: order.getTotal() }
  }
}
