import { Button } from './Button'
import { Label } from './Label'
import type { WidgetFactory } from './WidgetFactory'

export class LightWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    const label = new Label()
    label.setColor('black')
    return label
  }

  createButton(): Button {
    const button = new Button()
    button.setColor('white')
    button.setBackgroundColor('blue')

    return button
  }
}
