import { GetItems } from './application/GetItems'
import { PgPromiseConnectionAdapter } from './infra/database/PgPromiseConnectionAdapter'
import { ElysiaAdapter } from './infra/http/ElysiaAdapter'
import { ItemRepositoryDatabase } from './infra/repositories/database/ItemRepositoryDatabase'

const http = new ElysiaAdapter()

const connection = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)

http.on('get', '/items', () => {
  const getItems = new GetItems(itemRepository)
  return getItems.execute()
})

http.listen(3000)

console.log(`🦊 Elysia is running`)
