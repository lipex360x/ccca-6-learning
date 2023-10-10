import type { Item } from './Item'

export class Freight {
  private total = 0
  private DISTANCE = 1000
  private FACTOR = 100
  private MINIMUM_FREIGHT = 10

  addItem(item: Item, quantity: number) {
    const freight =
      item.getVolume() * this.DISTANCE * (item.getDencity() / this.FACTOR)
    this.total += freight * quantity
  }

  getTotal() {
    return this.total > 0 && this.total < this.MINIMUM_FREIGHT
      ? this.MINIMUM_FREIGHT
      : this.total
  }
}
