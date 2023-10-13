import type { OrderRepository } from '@/domain/repository/OrderRepository'

type OutputDTO = {
  code: string
  total: number
}

export class GetOrders {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OutputDTO[]> {
    const output: OutputDTO[] = []
    const orders = await this.orderRepository.list()

    for (const order of orders) {
      output.push({ code: order.code.value, total: order.getTotal() })
    }

    return output
  }
}
