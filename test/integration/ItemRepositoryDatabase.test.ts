import type { ItemRepository } from '@/domain/repository/ItemRepository'
import type { Connection } from '@/infra/database/Connection'
import { PgPromiseConnectionAdapter } from '@/infra/database/PgPromiseConnectionAdapter'
import { ItemRepositoryDatabase } from '@/infra/repositories/database/ItemRepositoryDatabase'

let connection: Connection
let itemRepository: ItemRepository

describe('ItemRepositoryDatabase', () => {
  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    itemRepository = new ItemRepositoryDatabase(connection)
  })

  afterEach(async () => {
    await connection.close()
  })

  it('Deve retornar itens do banco de dados', async () => {
    const items = await itemRepository.list()
    expect(items).toHaveLength(3)
  })
})
