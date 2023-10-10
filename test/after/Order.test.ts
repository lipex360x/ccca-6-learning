import { Coupon } from '@/after/Coupon'
import { Dimensions } from '@/after/Dimensions'
import { Item } from '@/after/Item'
import { Order } from '@/after/Order'

describe('Order', () => {
  it('não deve criar um pedido com CPF inválido', () => {
    expect(() => new Order('invalid-cpf')).toThrow(new Error('CPF Inválido'))
  })

  it('deve criar um pedido com 3 itens', () => {
    const document = '935.411.347.80'

    const order = new Order(document)

    order.addItem(new Item(1, 'Guitarra', 1000), 1)
    order.addItem(new Item(2, 'Amplificador', 5000), 1)
    order.addItem(new Item(3, 'Cabo', 30), 3)

    const total = order.getTotal()
    expect(total).toBe(6090)
  })

  it('deve criar um pedido com cupom de desconto', () => {
    const document = '935.411.347.80'

    const order = new Order(document)

    order.addItem(new Item(1, 'Guitarra', 1000), 1)
    order.addItem(new Item(2, 'Amplificador', 5000), 1)
    order.addItem(new Item(3, 'Cabo', 30), 3)

    order.addCoupon(new Coupon('VALE20', 20))

    const total = order.getTotal()
    expect(total).toBe(4872)
  })

  it('deve criar um pedido com cupom de desconto expirado', () => {
    const document = '935.411.347.80'

    const order = new Order(document, new Date('2023-10-10T10:00:00'))

    order.addItem(new Item(1, 'Guitarra', 1000), 1)
    order.addItem(new Item(2, 'Amplificador', 5000), 1)
    order.addItem(new Item(3, 'Cabo', 30), 3)

    order.addCoupon(new Coupon('VALE20', 20, new Date('2023-10-01T10:00:00'))) // ISO 8601

    const total = order.getTotal()
    expect(total).toBe(6090)
  })

  it('deve criar um pedido com 3 itens e calcular o frete', () => {
    const document = '935.411.347.80'

    const order = new Order(document)

    order.addItem(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
      1,
    )
    order.addItem(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
      1,
    )
    order.addItem(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1), 3)

    const total = order.getTotal()
    const freight = order.getFreight()

    expect(total).toBe(6350)
    expect(freight).toBe(260)
  })
})
