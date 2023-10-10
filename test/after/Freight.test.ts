import { Dimensions } from '@/after/Dimensions'
import { Freight } from '@/after/Freight'
import { Item } from '@/after/Item'

describe('Freight', () => {
  it('Deve calcular o frete', async () => {
    const freight = new Freight()

    freight.addItem(
      new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
      1,
    )
    freight.addItem(
      new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
      1,
    )
    freight.addItem(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1), 3)

    const total = freight.getTotal()

    expect(total).toBe(260)
  })

  it('Deve calcular o frete mínimo', async () => {
    const freight = new Freight()

    freight.addItem(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 0.9), 1)

    const total = freight.getTotal()

    expect(total).toBe(10)
  })
})
