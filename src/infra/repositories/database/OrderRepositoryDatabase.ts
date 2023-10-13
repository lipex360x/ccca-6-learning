import { Order } from '@/domain/entity/Order'
import { OrderCoupon } from '@/domain/entity/OrderCoupon'
import { OrderItem } from '@/domain/entity/OrderItem'
import type { OrderRepository } from '@/domain/repository/OrderRepository'
import type { Connection } from '@/infra/database/Connection'

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      'insert into orders (code, cpf, issue_date, freight, sequence, total, coupon_code, coupon_percentage) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
      [
        order.code.value,
        order.cpf.value,
        order.date,
        order.freight.getTotal(),
        order.sequence,
        order.getTotal(),
        order.coupon?.code,
        order.coupon?.percentage,
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

  async get(code: string): Promise<Order> {
    const [orderData] = await this.connection.query(
      'select * from orders where code = $1',
      [code],
    )

    const orderItemsData = await this.connection.query(
      'select * from order_items where id_order = $1',
      [orderData.id_order],
    )

    const order = new Order(
      orderData.cpf,
      new Date(orderData.issue_date),
      orderData.sequence,
    )

    order.orderItems = orderItemsData.map(
      (orderItemData: any) =>
        new OrderItem(
          orderItemData.id_item,
          parseFloat(orderItemData.price),
          orderItemData.quantity,
        ),
    )

    order.freight.total = parseFloat(orderData.freight)

    if (orderData.coupon_code) {
      order.coupon = new OrderCoupon(
        orderData.coupon_code,
        orderData.coupon_percentage,
      )
    }

    return order
  }

  async list(): Promise<Order[]> {
    const orders: Order[] = []
    const ordersData = await this.connection.query(
      'select code from orders',
      [],
    )

    for (const orderData of ordersData) {
      const order = await this.get(orderData.code)
      orders.push(order)
    }

    return orders
  }

  async clear(): Promise<void> {
    await this.connection.query('delete from order_items', [])
    await this.connection.query('delete from orders', [])
  }
}
