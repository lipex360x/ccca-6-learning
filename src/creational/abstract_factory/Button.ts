import type { IButton } from './IButton'

export class Button implements IButton {
  backgroundColor: string
  color = 'white'

  constructor(readonly theme: string) {
    this.backgroundColor = this.getBackgroundColor()
  }

  private getBackgroundColor() {
    return this.theme === 'light' ? 'blue' : 'black'
  }
}
