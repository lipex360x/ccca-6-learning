import { Coupon } from '@/after/1/Coupon'
import { Item } from '@/after/1/Item'
import { Order } from '@/after/1/Order'

describe('Order', () => {
  it('não deve criar um pedido com CPF inválido', () => {
    expect(() => new Order('invalid-cpf')).toThrow(new Error('CPF Inválido'))
  })

  it('deve criar um pedido com 3 itens', () => {
    const document = '082.991.486-26'
    const order = new Order(document)

    order.addItem(new Item(1, 'Guitarra', 1000), 1)
    order.addItem(new Item(2, 'Amplificador', 5000), 1)
    order.addItem(new Item(3, 'Cabo', 30), 3)

    const total = order.getTotal()
    expect(total).toBe(6090)
  })

  it('deve criar um pedido com cupom de desconto', () => {
    const document = '082.991.486-26'
    const order = new Order(document)

    order.addItem(new Item(1, 'Guitarra', 1000), 1)
    order.addItem(new Item(2, 'Amplificador', 5000), 1)
    order.addItem(new Item(3, 'Cabo', 30), 3)

    order.addCoupon(new Coupon('VALE20', 20))

    const total = order.getTotal()
    expect(total).toBe(4872)
  })
})
