import { Item } from '@/before/2/Item'

describe('Item', () => {
  it('deve criar um novo item', () => {
    const item = new Item({
      idItem: 2,
      description: 'Guitarra',
      price: 2000,
      width: 100,
      height: 30,
      depth: 10,
      weight: 1,
    })

    expect(item).toBeTruthy()
  })

  it('deve retornar o volume de um item', () => {
    const item = new Item({
      idItem: 2,
      description: 'Guitarra',
      price: 2000,
      width: 100,
      height: 30,
      depth: 10,
      weight: 3,
    })

    expect(item.getVolume()).toBe(0.03)
  })

  it('deve retornar a densidade de um item', () => {
    const item = new Item({
      idItem: 2,
      description: 'Guitarra',
      price: 2000,
      width: 100,
      height: 30,
      depth: 10,
      weight: 3,
    })

    expect(item.getDensity()).toBe(100)
  })
})
