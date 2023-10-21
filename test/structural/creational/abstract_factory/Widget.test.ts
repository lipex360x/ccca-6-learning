import { View } from '@/creational/abstract_factory/View'

describe('Widget', () => {
  it('deve criar uma view com tema claro', async () => {
    const view = new View('light')
    expect(view.label.color).toBe('black')
    expect(view.button.backgroundColor).toBe('blue')
    expect(view.button.color).toBe('white')
  })

  it('deve criar uma view com tema escuro', async () => {
    const view = new View('dark')
    expect(view.label.color).toBe('white')
    expect(view.button.backgroundColor).toBe('black')
    expect(view.button.color).toBe('white')
  })
})
