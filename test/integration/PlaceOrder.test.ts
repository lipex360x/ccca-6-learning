import { PlaceOrder } from '@/application/PlaceOrder'
import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'
import { PgPromiseConnectionAdapter } from '@/infra/database/PgPromiseConnectionAdapter'
import { OrderRepositoryDatabase } from '@/infra/repositories/database/OrderRepositoryDatabase'
import CouponRepositoryMemory from '@/infra/repositories/memory/CouponRepositoryMemory'
import { ItemRepositoryMemory } from '@/infra/repositories/memory/ItemRepositoryMemory'
// import { OrderRepositoryMemory } from '@/infra/repositories/memory/OrderRepositoryMemory'

describe('PlaceOrder', () => {
  it('Deve fazer um pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()

    const connection = new PgPromiseConnectionAdapter()
    const orderRepository = new OrderRepositoryDatabase(connection)
    const couponRepository = new CouponRepositoryMemory()

    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository,
    )

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

    await connection.close()
  })
})
