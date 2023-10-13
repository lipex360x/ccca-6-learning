import { GetOrder } from '@/application/GetOrder'
import { GetOrders } from '@/application/GetOrders'
import type { OrderRepository } from '@/domain/repository/OrderRepository'

import type { Http } from '../http/Http'

export class OrderController {
  constructor(readonly http: Http, readonly orderRepository: OrderRepository) {
    http.on('get', '/orders', () => {
      const getOrders = new GetOrders(orderRepository)
      return getOrders.execute()
    })

    http.on('get', '/orders/:code', (params: any) => {
      const getOrder = new GetOrder(orderRepository)
      return getOrder.execute(params.code)
    })
  }
}
