import type { Coupon } from '../entity/Coupon'

export interface CouponRepository {
  get(coupon: string): Promise<Coupon>
  save(coupon: Coupon): Promise<void>
}
