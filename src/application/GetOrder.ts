import type { OrderRepository } from '@/domain/repository/OrderRepository'

type InputDTO = {
  code: string
}

type OutputDTO = {
  code: string
  total: number
}

export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: InputDTO): Promise<OutputDTO> {
    const order = await this.orderRepository.get(input.code)

    return { code: order.code.value, total: order.getTotal() }
  }
}
