import OrderCode from '@/domain/entity/OrderCode'

describe('OrderCode', () => {
  test('Deve gerar o código do pedido', function () {
    const orderCode = new OrderCode(new Date('2021-03-01T10:00:00'), 1)
    expect(orderCode.value).toBe('202100000001')
  })
})
