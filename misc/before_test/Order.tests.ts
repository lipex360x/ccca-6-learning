import timekeeper from 'timekeeper'

import { Coupon } from 'misc/before/Coupon'
import { Item } from 'misc/before/Item'
import { Order } from 'misc/before/Order'

describe('Order', () => {
  it('não deve criar um pedido com CPF inválido', () => {
    expect(() => new Order('invalid-cpf')).toThrow(new Error('CPF Inválido'))
  })

  it('deve criar um pedido com 3 itens', () => {
    const document = '082.991.486-26'
    const order = new Order(document)

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Guitarra',
        price: 1000,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      1,
    )

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Amplificador',
        price: 5000,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      1,
    )

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Cabo',
        price: 30,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      3,
    )

    const total = order.getTotal()
    expect(total).toBe(6090)
  })

  it('deve criar um pedido com cupom de desconto', () => {
    timekeeper.freeze(new Date('2023-01-01'))

    const document = '082.991.486-26'
    const order = new Order(document)

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Guitarra',
        price: 1000,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      1,
    )

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Amplificador',
        price: 5000,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      1,
    )

    order.addItem(
      new Item({
        idItem: 1,
        description: 'Cabo',
        price: 30,
        width: 200,
        height: 30,
        depth: 10,
        weight: 3,
      }),
      3,
    )

    order.addCoupon(new Coupon('VALE20', 20, new Date('2023-02-01')))

    const total = order.getTotal()
    expect(total).toBe(4872)
  })
})
