import Elysia from 'elysia'

import { Dimensions } from './after/Dimensions'
import { GetItems } from './after/GetItems'
import { Item } from './after/Item'
import { ItemRepositoryMemory } from './after/ItemRepositoryMemory'

const app = new Elysia()

app.get('/items', async () => {
  const itemRepository = new ItemRepositoryMemory()

  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimensions(100, 30, 10), 3),
  )
  itemRepository.save(
    new Item(2, 'Amplificador', 5000, new Dimensions(50, 50, 50), 20),
  )
  itemRepository.save(new Item(3, 'Cabo', 30, new Dimensions(10, 10, 10), 1))

  const getItems = new GetItems(itemRepository)
  return getItems.execute()
})

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
