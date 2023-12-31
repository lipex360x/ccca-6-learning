import { GetOrders } from '@/application/GetOrders'
import { PlaceOrder } from '@/application/PlaceOrder'
import { Coupon } from '@/domain/entity/Coupon'
import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'
import type { CouponRepository } from '@/domain/repository/CouponRepository'
import type { ItemRepository } from '@/domain/repository/ItemRepository'
import type { OrderRepository } from '@/domain/repository/OrderRepository'
import type { Connection } from '@/infra/database/Connection'
import { PgPromiseConnectionAdapter } from '@/infra/database/PgPromiseConnectionAdapter'
import { OrderRepositoryDatabase } from '@/infra/repositories/database/OrderRepositoryDatabase'
import CouponRepositoryMemory from '@/infra/repositories/memory/CouponRepositoryMemory'
import { ItemRepositoryMemory } from '@/infra/repositories/memory/ItemRepositoryMemory'

let connection: Connection
let orderRepository: OrderRepository
let itemRepository: ItemRepository
let couponRepository: CouponRepository

describe('GetOrders', () => {
  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    orderRepository = new OrderRepositoryDatabase(connection)
    itemRepository = new ItemRepositoryMemory()
    couponRepository = new CouponRepositoryMemory()

    await orderRepository.clear()
  })

  afterEach(async () => {
    await orderRepository.clear()
    await connection.close()
  })

  it('Deve obter uma lista vazia de pedidos', async () => {
    const getOrders = new GetOrders(orderRepository)
    const output = await getOrders.execute()
    expect(output).toHaveLength(0)
  })

  it('Deve obter os pedidos cadastrados', async () => {
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

    couponRepository.save(new Coupon('VALE20', 20, new Date(2025, 1, 1)))

    const input = {
      document: '935.411.347.80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date(2023, 1, 1),
      coupon: 'VALE20',
    }
    await placeOrder.execute(input)
    await placeOrder.execute(input)

    const getOrders = new GetOrders(orderRepository)
    const output = await getOrders.execute()
    const [order1, order2] = output

    expect(output).toHaveLength(2)
    expect(order1.code).toBe('202300000001')
    expect(order1.total).toBe(5132)
    expect(order2.code).toBe('202300000002')
    expect(order2.total).toBe(5132)
  })
})
