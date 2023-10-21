export class Button {
  private color: string
  private backgroundColor: string

  setColor(color: string) {
    this.color = color
  }

  get getColor() {
    return this.color
  }

  setBackgroundColor(color: string) {
    this.backgroundColor = color
  }

  get getBackgroundColor() {
    return this.backgroundColor
  }
}
