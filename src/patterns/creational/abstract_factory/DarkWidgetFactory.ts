import { Button } from './Button'
import { Label } from './Label'
import type { WidgetFactory } from './WidgetFactory'

export class DarkWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    const label = new Label()
    label.setColor('white')
    return label
  }

  createButton(): Button {
    const button = new Button()
    button.setColor('white')
    button.setBackgroundColor('black')
    return button
  }
}
