import { Dimensions } from '@/after/Dimensions'
import { GetItems } from '@/after/GetItems'
import { Item } from '@/after/Item'
import { ItemRepositoryMemory } from '@/after/ItemRepositoryMemory'

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
