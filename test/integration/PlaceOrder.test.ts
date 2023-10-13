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
// import { OrderRepositoryMemory } from '@/infra/repositories/memory/OrderRepositoryMemory'
let connection: Connection
let itemRepository: ItemRepository
let orderRepository: OrderRepository
let couponRepository: CouponRepository

describe('PlaceOrder', () => {
  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    itemRepository = new ItemRepositoryMemory()
    couponRepository = new CouponRepositoryMemory()
    orderRepository = new OrderRepositoryDatabase(connection)
  })

  afterEach(async () => {
    await orderRepository.clear()
    await connection.close()
  })

  it('Deve fazer um pedido', async () => {
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
  })

  test('Deve fazer um pedido com desconto', async function () {
    couponRepository.save(new Coupon('VALE20', 20, new Date(2022, 1, 1)))

    itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
    )
    itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
    )
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository,
    )

    const input = {
      document: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
      date: new Date(2021, 3, 1),
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5132)
  })

  test('Deve fazer um pedido e gerar o código do pedido', async function () {
    itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
    )
    itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
    )
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository,
    )
    const input = {
      document: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2021-03-01T10:00:00'),
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202100000001')
  })
})
