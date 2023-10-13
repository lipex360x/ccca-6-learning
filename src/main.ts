import { ItemController } from './infra/controllers/ItemController'
import { OrderController } from './infra/controllers/OrderController'
import { PgPromiseConnectionAdapter } from './infra/database/PgPromiseConnectionAdapter'
import { ElysiaAdapter } from './infra/http/ElysiaAdapter'
import { ItemRepositoryDatabase } from './infra/repositories/database/ItemRepositoryDatabase'
import { OrderRepositoryDatabase } from './infra/repositories/database/OrderRepositoryDatabase'

const http = new ElysiaAdapter()

const connection = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryDatabase(connection)

new ItemController(http, itemRepository)
new OrderController(http, orderRepository)

http.listen(3000)

console.log(`🦊 Elysia is running`)
