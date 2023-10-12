import type { Order } from '@/domain/entity/Order'
import type { OrderRepository } from '@/domain/repository/OrderRepository'
import type { Connection } from '@/infra/database/Connection'

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      'insert into orders (code, cpf, issue_date, freight, sequence, total, coupon_code) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      [
        order.code.value,
        order.cpf.value,
        order.date,
        order.freight.getTotal(),
        order.sequence,
        order.getTotal(),
        order.coupon?.code,
      ],
    )

    for (const orderItem of order.orderItems) {
      await this.connection.query(
        'insert into order_items (id_order, id_item, price, quantity) values ($1, $2, $3, $4)',
        [
          orderData.id_order,
          orderItem.idItem,
          orderItem.price,
          orderItem.quantity,
        ],
      )
    }
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      'select count(*)::int from orders',
      [],
    )

    return row.count
  }
}
