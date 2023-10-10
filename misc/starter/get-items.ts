import { Connection } from './connection'
import type { IItemsRepository } from './items-repository.interface'

interface Output {
  description: string
  price: number
}

export class GetItems {
  connection: Connection

  constructor(readonly repository: IItemsRepository) {
    this.connection = new Connection()
  }

  async execute(): Promise<Output[]> {
    const items = await this.repository.getItems()
    const output: Output[] = []

    for (const item of items) {
      output.push({ description: item.description, price: item.price })
    }

    return output
  }
}
