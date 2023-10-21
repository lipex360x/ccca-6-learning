import type { ILabel } from './ILabel'

export class Label implements ILabel {
  color: string

  constructor(readonly theme: string) {
    this.color = this.getColor()
  }

  private getColor() {
    return this.theme === 'light' ? 'black' : 'white'
  }
}
