export class Dimensions {
  private FACTOR = 100

  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
  ) {
    if (width < 0 || height < 0 || length < 0)
      throw new Error('Invalid dimension')
  }

  getVolume() {
    return (
      (this.width / this.FACTOR) *
      (this.height / this.FACTOR) *
      (this.length / this.FACTOR)
    )
  }
}
