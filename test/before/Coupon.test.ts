import timekeeper from 'timekeeper'

import { Coupon } from '@/before/Coupon'

describe('Coupon', () => {
  afterEach(() => {
    timekeeper.reset()
  })

  test('Deve criar um cupom', function () {
    timekeeper.freeze(new Date('2023-01-01'))

    const coupon = new Coupon('VALE20', 20, new Date('2023-02-01'))
    expect(coupon.calculateDiscount(1000)).toBe(200)
  })

  it('Não deve aplicar cupom de desconto expirado', () => {
    timekeeper.freeze(new Date('2023-01-01'))

    expect(() => new Coupon('VALE20', 20, new Date('2022-01-01'))).toThrow(
      new Error('Invalid coupon'),
    )
  })
})
