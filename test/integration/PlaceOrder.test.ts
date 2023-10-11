import { PlaceOrder } from '@/application/PlaceOrder'
import { Coupon } from '@/domain/entity/Coupon'
import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'
import { CouponRepositoryMemory } from '@/infra/repositories/memory/CouponRepositoryMemory'
import { ItemRepositoryMemory } from '@/infra/repositories/memory/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '@/infra/repositories/memory/OrderRepositoryMemory'

describe('PlaceOrder', () => {
  it('Deve fazer um pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
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
  })

  it('Deve fazer um pedido e gerar o código do pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
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
      date: new Date(2020, 1, 1),
    }

    const output = await placeOrder.execute(input)

    expect(output.total).toBe(6350)
    expect(output.code).toBe('202000000001')
  })

  it('Deve fazer um pedido com desconto', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
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

    couponRepository.save(new Coupon('VALE20', 20))

    const input = {
      document: '935.411.347.80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
    }

    const output = await placeOrder.execute(input)

    expect(output.total).toBe(5132)
  })
})
