import { ElysiaAdapter } from './after/ElysiaAdapter'
import { GetItems } from './after/GetItems'
import { ItemRepositoryDatabase } from './after/ItemRepositoryDatabase'
import { PgPromiseConnectionAdapter } from './after/PgPromiseConnectionAdapter'

const http = new ElysiaAdapter()

const connection = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)

http.on('get', '/items', () => {
  const getItems = new GetItems(itemRepository)
  return getItems.execute()
})

http.listen(3000)

console.log(`🦊 Elysia is running`)
