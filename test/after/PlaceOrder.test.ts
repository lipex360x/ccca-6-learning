import { Dimensions } from '@/after/Dimensions'
import { Item } from '@/after/Item'
import { ItemRepositoryMemory } from '@/after/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '@/after/OrderRepositoryMemory'
import { PlaceOrder } from '@/after/PlaceOrder'

describe('PlaceOrder', () => {
  it('Deve fazer um pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()

    const placeOrder = new PlaceOrder(itemRepository, orderRepository)

    itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
    )
    itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
    )
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const input = {
      document: '935.411.347.80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    }

    const output = await placeOrder.execute(input)

    expect(output.total).toBe(6350)
  })
})
