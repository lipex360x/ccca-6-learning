import { Button } from './Button'
import { Label } from './Label'

export class View {
  label: Label
  button: Button

  constructor(readonly theme: string) {
    this.label = new Label(theme)
    this.button = new Button(theme)
  }
}
