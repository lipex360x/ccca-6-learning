import { PgPromiseConnectionAdapter } from '@/infra/database/PgPromiseConnectionAdapter'
import { ItemRepositoryDatabase } from '@/infra/repositories/database/ItemRepositoryDatabase'

describe('ItemRepositoryDatabase', () => {
  it('Deve retornar itens do banco de dados', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const items = await itemRepository.list()
    expect(items).toHaveLength(3)
  })
})
