import type { Coupon } from './Coupon'
import Cpf from './Cpf'
import { Freight } from './Freight'
import type { Item } from './Item'
import OrderCode from './OrderCode'
import { OrderCoupon } from './OrderCoupon'
import { OrderItem } from './OrderItem'

export class Order {
  code: OrderCode
  cpf: Cpf
  orderItems: OrderItem[] = []
  coupon?: OrderCoupon
  freight = new Freight()

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly sequence: number = 1,
  ) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.code = new OrderCode(date, sequence)
  }

  addItem(item: Item, quantity: number) {
    if (this.isDuplicated(item)) throw new Error('Duplicated item')
    this.freight.addItem(item, quantity)
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.date))
      this.coupon = new OrderCoupon(coupon.code, coupon.percentage)
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

  private isDuplicated(item: Item) {
    return this.orderItems.some((orderItem) => orderItem.idItem === item.idItem)
  }
}
