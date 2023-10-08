import { Order } from '@/before/1/order'
import { OrderItem } from '@/before/1/order-item'

it('deve criar um pedido com 3 itens', () => {
  const document = '082.991.486-26'
  const order = new Order(document)

  const orderItems = [
    new OrderItem({ description: 'item 1', price: 10, quantity: 1 }),
    new OrderItem({ description: 'item 2', price: 20, quantity: 1 }),
    new OrderItem({ description: 'item 3', price: 30, quantity: 1 }),
  ]

  const newOrder = order.create(orderItems)

  expect(order.total(newOrder.id)).toBe(60)
})

it('deve criar um pedido com cupom de desconto', () => {
  const document = '082.991.486-26'
  const order = new Order(document)

  const orderItems = [
    new OrderItem({ description: 'item 1', price: 10, quantity: 1 }),
    new OrderItem({ description: 'item 2', price: 20, quantity: 1 }),
    new OrderItem({ description: 'item 3', price: 30, quantity: 1 }),
  ]

  const newOrder = order.create(orderItems)

  expect(order.totalWithDiscount(newOrder.id, '20DISCOUNT')).toBe(48)
})
