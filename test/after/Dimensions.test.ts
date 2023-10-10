import { Dimensions } from '@/after/Dimensions'

describe('Dimensions', () => {
  it('Deve criar as dimensões', async () => {
    const dimension = new Dimensions(100, 30, 10)
    const volume = dimension.getVolume()
    expect(volume).toBe(0.03)
  })
})
