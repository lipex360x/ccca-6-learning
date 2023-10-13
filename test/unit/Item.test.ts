import { Dimensions } from '@/domain/entity/Dimensions'
import { Item } from '@/domain/entity/Item'

describe('Item', () => {
  it('Deve lançar uma exception se o peso for negativo', async () => {
    expect(
      () => new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), -20),
    ).toThrow(new Error('Invalid weight'))
  })
})
