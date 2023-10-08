export class Freight {
  constructor(
    private readonly distance: number,
    private readonly volume: number,
    private readonly dencity: number,
  ) {}

  getTotal() {
    const total = this.distance * this.volume * (this.dencity / 100)

    return total < 10 ? 10 : total
  }
}
