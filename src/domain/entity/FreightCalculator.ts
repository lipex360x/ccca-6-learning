import type { Item } from './Item'

export class FreightCalculator {
  private DISTANCE = 1000
  private FACTOR = 100

  calculate(item: Item, quantity: number) {
    const freight =
      item.getVolume() * this.DISTANCE * (item.getDensity() / this.FACTOR)
    return freight * quantity
  }
}
