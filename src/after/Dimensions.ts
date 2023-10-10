export class Dimensions {
  private FACTOR = 100

  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
  ) {}

  getVolume() {
    return (
      (this.width / this.FACTOR) *
      (this.height / this.FACTOR) *
      (this.length / this.FACTOR)
    )
  }
}
