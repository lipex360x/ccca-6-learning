import { ValidateCoupon } from '@/application/ValidateCoupon'
import { Coupon } from '@/domain/entity/Coupon'
import CouponRepositoryMemory from '@/infra/repositories/memory/CouponRepositoryMemory'

describe('ValidateCoupon', () => {
  it('Deve validar um cupom de desconto expirado', async () => {
    const couponRepository = new CouponRepositoryMemory()
    const validateCoupon = new ValidateCoupon(couponRepository)

    couponRepository.save(new Coupon('VALE20', 20, new Date(2020, 1, 1)))

    const input = {
      code: 'VALE20',
      date: new Date(2023, 1, 1),
    }

    const output = await validateCoupon.execute(input)

    expect(output.isExpired).toBeTruthy()
  })

  it('Deve validar um cupom de desconto válido', async () => {
    const couponRepository = new CouponRepositoryMemory()
    const validateCoupon = new ValidateCoupon(couponRepository)

    couponRepository.save(new Coupon('VALE20', 20, new Date(2023, 2, 1)))

    const input = {
      code: 'VALE20',
      date: new Date(2023, 1, 1),
    }

    const output = await validateCoupon.execute(input)

    expect(output.isExpired).toBeFalsy()
  })
})
