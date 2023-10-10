import type { Coupon } from './Coupon'
import Cpf from './Cpf'
import type { Item } from './Item'
import { OrderItem } from './OrderItem'

export class Order {
  private orderItems: OrderItem[] = []
  private coupon?: Coupon

  constructor(readonly document: string) {
    new Cpf(document)
    this.orderItems = []
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  getTotal() {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)

    if (this.coupon) total -= this.coupon.calculateDiscount(total)

    return total
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon
  }
}
