import { OrderCode } from '@/domain/entity/OrderCode'

describe('OrderCode', () => {
  it('Deve gerar o código do pedido', async () => {
    const orderCode = new OrderCode(new Date('2023-10-10T10:10:10'), 1)

    expect(orderCode.value).toBe('202300000001')
  })
})
