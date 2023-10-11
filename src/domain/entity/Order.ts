import type { Coupon } from './Coupon'
import Cpf from './Cpf'
import { Freight } from './Freight'
import type { Item } from './Item'
import { OrderCode } from './OrderCode'
import { OrderItem } from './OrderItem'

export class Order {
  private orderItems: OrderItem[] = []
  private coupon?: Coupon
  private freight = new Freight()
  code: OrderCode

  constructor(
    readonly document: string,
    private readonly date: Date = new Date(),
    readonly sequence: number = 1,
  ) {
    new Cpf(document)
    this.orderItems = []
    this.code = new OrderCode(date, sequence)
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity)

    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.date)) this.coupon = coupon
  }

  getTotal() {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)

    if (this.coupon) total -= this.coupon.calculateDiscount(total)

    total += this.freight.getTotal()

    return total
  }

  getFreight() {
    return this.freight.getTotal()
  }
}
