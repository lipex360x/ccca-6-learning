import { Freight } from '@/before/Freight'
import { Item } from '@/before/Item'

describe('Freight', () => {
  test('Deve calcular o valor do frete com base nas dimensões', () => {
    const item = new Item({
      idItem: 1,
      description: 'Guitarra',
      price: 2000,
      width: 100,
      height: 30,
      depth: 10,
      weight: 3,
    })

    const fleight = new Freight(1000, item.getVolume(), item.getDensity())

    expect(fleight.getTotal()).toBe(30)
  })

  test('Deve retornar o valor mínimo de R$10,00 caso o frete seja inferior a este valor', () => {
    const item = new Item({
      idItem: 2,
      description: 'Camera',
      price: 2000,
      width: 20,
      height: 15,
      depth: 10,
      weight: 1,
    })

    const fleight = new Freight(1000, item.getVolume(), item.getDensity())

    expect(fleight.getTotal()).toBe(10)
  })
})
