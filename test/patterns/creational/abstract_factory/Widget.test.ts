import { DarkWidgetFactory } from '@/patterns/creational/abstract_factory/DarkWidgetFactory'
import { LightWidgetFactory } from '@/patterns/creational/abstract_factory/LightWidgetFactory'
import { View } from '@/patterns/creational/abstract_factory/View'

describe('Widget', () => {
  it('deve criar uma view com tema claro', async () => {
    const view = new View(new LightWidgetFactory())
    expect(view.label.getColor).toBe('black')
    expect(view.button.getBackgroundColor).toBe('blue')
    expect(view.button.getColor).toBe('white')
  })

  it('deve criar uma view com tema escuro', async () => {
    const view = new View(new DarkWidgetFactory())
    expect(view.label.getColor).toBe('white')
    expect(view.button.getBackgroundColor).toBe('black')
    expect(view.button.getColor).toBe('white')
  })
})
