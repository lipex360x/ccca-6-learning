import { ItemRepositoryDatabase } from '@/after/ItemRepositoryDatabase'
import { PgPromiseConnectionAdapter } from '@/after/PgPromiseConnectionAdapter'

describe('ItemRepositoryDatabase', () => {
  it('Deve retornar itens do banco de dados', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const items = await itemRepository.list()
    expect(items).toHaveLength(3)
  })
})
