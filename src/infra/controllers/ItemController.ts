import { GetItems } from '@/application/GetItems'
import type { ItemRepository } from '@/domain/repository/ItemRepository'

import type { Http } from '../http/Http'

export class ItemController {
  constructor(readonly http: Http, readonly itemRepository: ItemRepository) {
    http.on('get', '/items', () => {
      const getItems = new GetItems(itemRepository)
      return getItems.execute()
    })
  }
}
