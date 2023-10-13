import axios from 'axios'

describe('API', () => {
  it('Deve chamar /items', async () => {
    const response = await axios.get('http://localhost:3000/items')
    const items = response.data
    expect(items).toHaveLength(3)
  })
})
