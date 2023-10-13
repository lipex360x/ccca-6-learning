import { Freight } from '@/domain/entity/Freight'
import type { ItemRepository } from '@/domain/repository/ItemRepository'

type InputDTO = {
  orderItems: { itemId: number; quantity: number }[]
}

type OutputDTO = {
  total: number
}

export class SimulateFreight {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: InputDTO): Promise<OutputDTO> {
    const freight = new Freight()

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.itemId)
      freight.addItem(item, orderItem.quantity)
    }

    return { total: freight.getTotal() }
  }
}
