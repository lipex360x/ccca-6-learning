import type { ItemRepository } from '../domain/repository/ItemRepository'

type OutputDTO = {
  idItem: number
  description: string
  price: number
}

export class GetItems {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<OutputDTO[]> {
    const items = await this.itemRepository.list()
    const output: OutputDTO[] = []

    for (const item of items) {
      output.push({
        idItem: item.idItem,
        description: item.description,
        price: item.price,
      })
    }

    return output
  }
}
