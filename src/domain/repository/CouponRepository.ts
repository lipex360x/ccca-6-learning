import type { Coupon } from '../entity/Coupon'

export interface CouponRepository {
  get(code: string): Promise<Coupon>
  save(coupon: Coupon): Promise<void>
}
