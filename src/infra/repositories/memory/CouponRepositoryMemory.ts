import invariant from 'tiny-invariant'

import type { Coupon } from '@/domain/entity/Coupon'
import type { CouponRepository } from '@/domain/repository/CouponRepository'

export class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[]

  constructor() {
    this.coupons = []
  }

  async get(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === code)
    if (!coupon) invariant(coupon, 'Coupon not found')
    return coupon
  }

  async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon)
  }
}
