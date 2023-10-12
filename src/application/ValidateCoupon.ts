import type { CouponRepository } from '@/domain/repository/CouponRepository'

type InputDTO = {
  code: string
  date: Date
}

type OutputDTO = {
  isExpired: boolean
}

export class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(input: InputDTO): Promise<OutputDTO> {
    const coupon = await this.couponRepository.get(input.code)
    const isExpired = coupon.isExpired(input.date)

    return { isExpired }
  }
}
