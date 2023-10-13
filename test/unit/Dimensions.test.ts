import { Dimensions } from '@/domain/entity/Dimensions'

describe('Dimensions', () => {
  it('Deve criar as dimensões', async () => {
    const dimension = new Dimensions(100, 30, 10)
    const volume = dimension.getVolume()
    expect(volume).toBe(0.03)
  })

  it('Deve lançar uma exception se alguma dimensão for negativa', async () => {
    expect(() => new Dimensions(-100, -30, -10)).toThrow(
      new Error('Invalid dimension'),
    )
  })
})
