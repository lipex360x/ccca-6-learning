import { SimulateFreight } from '@/application/SimulateFreight'
import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'
import type { ItemRepository } from '@/domain/repository/ItemRepository'
import { ItemRepositoryMemory } from '@/infra/repositories/memory/ItemRepositoryMemory'

let itemRepository: ItemRepository
let simulateFreight: SimulateFreight

describe('SimulateFreight', () => {
  beforeEach(() => {
    itemRepository = new ItemRepositoryMemory()
    simulateFreight = new SimulateFreight(itemRepository)
  })

  it('Deve Simular o frete do pedido', async () => {
    itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
    )
    itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
    )
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const input = {
      orderItems: [
        { itemId: 1, quantity: 1 },
        { itemId: 2, quantity: 1 },
        { itemId: 3, quantity: 2 },
      ],
    }

    const output = await simulateFreight.execute(input)

    expect(output.total).toBe(250)
  })
})
