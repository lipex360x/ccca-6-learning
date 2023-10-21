import type { Button } from './Button'
import type { Label } from './Label'
import type { WidgetFactory } from './WidgetFactory'

export class View {
  label: Label
  button: Button

  constructor(widgetFactory: WidgetFactory) {
    this.label = widgetFactory.createLabel()
    this.button = widgetFactory.createButton()
  }
}
