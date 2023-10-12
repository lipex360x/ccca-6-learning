import type { Item } from './Item'

export class FreightCalculator {
  // private total = 0
  private DISTANCE = 1000
  private FACTOR = 100
  // private MINIMUM_FREIGHT = 10

  calculate(item: Item, quantity: number) {
    const freight =
      item.getVolume() * this.DISTANCE * (item.getDencity() / this.FACTOR)
    return freight * quantity
  }

  // getTotal() {
  //   return this.total > 0 && this.total < this.MINIMUM_FREIGHT
  //     ? this.MINIMUM_FREIGHT
  //     : this.total
  // }
}
