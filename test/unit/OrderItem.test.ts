import { OrderItem } from '@/domain/entity/OrderItem'

describe('OrderItem', () => {
  test('Deve criar um item de pedido', function () {
    const orderItem = new OrderItem(1, 1000, 2)
    expect(orderItem.getTotal()).toBe(2000)
  })
})
