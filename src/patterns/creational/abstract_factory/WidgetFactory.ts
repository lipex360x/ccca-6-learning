import type { Button } from './Button'
import type { Label } from './Label'

export interface WidgetFactory {
  createLabel(): Label
  createButton(): Button
}
