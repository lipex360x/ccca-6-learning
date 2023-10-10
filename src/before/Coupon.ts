export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date,
  ) {
    if (!this.isValidCoupon()) throw new Error('Invalid coupon')
  }

  calculateDiscount(total: number) {
    return (total * this.percentage) / 100
  }

  isValidCoupon() {
    return this.expirationDate > new Date()
  }
}
