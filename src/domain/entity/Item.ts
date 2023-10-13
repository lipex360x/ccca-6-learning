import type { Dimensions } from './Dimensions'

export class Item {
  constructor(
    readonly idItem: number,
    readonly description: string,
    readonly price: number,
    readonly dimension?: Dimensions,
    readonly weight?: number,
  ) {}

  getVolume() {
    if (this.dimension) {
      return this.dimension.getVolume()
    }

    return 0
  }

  getDensity() {
    if (this.dimension && this.weight) {
      return this.weight / this.dimension.getVolume()
    }

    return 0
  }
}
