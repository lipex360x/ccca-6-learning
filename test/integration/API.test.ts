import axios from 'axios'

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

describe('API', () => {
  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    itemRepository = new ItemRepositoryMemory()
    orderRepository = new OrderRepositoryDatabase(connection)
    couponRepository = new CouponRepositoryMemory()
  })

  afterEach(async () => {
    await orderRepository.clear()
    await connection.close()
  })

  it('Deve chamar /items', async () => {
    const response = await axios.get('http://localhost:3000/items')
    const items = response.data
    expect(items).toHaveLength(3)
  })

  it('Deve chamar /orders', async () => {
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

    await placeOrder.execute(input)
    await placeOrder.execute(input)
    await placeOrder.execute(input)

    const response = await axios.get('http://localhost:3000/orders')
    const orders = response.data
    expect(orders).toHaveLength(3)
  })

  it('Deve chamar /orders/code', async () => {
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
      coupon: 'VALE20',
      date: new Date(2023, 1, 1),
    }

    await placeOrder.execute(input)

    const response = await axios.get(
      'http://localhost:3000/orders/202300000001',
    )
    const order = response.data
    expect(order.total).toBe(5132)
  })
})
