import type { ItemRepository } from '@/domain/repository/ItemRepository'

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}
}
