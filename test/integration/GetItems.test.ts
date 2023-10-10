import { GetItems } from '@/application/GetItems'
import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'
import { ItemRepositoryMemory } from '@/infra/repositories/memory/ItemRepositoryMemory'

describe('GetItems', () => {
  it('Deve buscar os itens', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const getItems = new GetItems(itemRepository)

    itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
    )
    itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
    )
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const output = await getItems.execute()

    expect(output).toHaveLength(3)
  })
})
