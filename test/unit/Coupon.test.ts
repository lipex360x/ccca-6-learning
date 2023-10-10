import { Coupon } from '@/domain/entity/Coupon'

describe('Coupon', () => {
  test('Deve criar um cupom', function () {
    const coupon = new Coupon('VALE20', 20)
    expect(coupon.calculateDiscount(1000)).toBe(200)
  })

  test('Deve checar se um cupom está expirado', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2023-09-09'))

    const isExpired = coupon.isExpired(new Date('2023-10-10'))

    expect(isExpired).toBeTruthy()
  })
})
