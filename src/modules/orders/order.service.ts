import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Order } from "./entities/order.entity"
import { Table } from "../tables/entities/table.entity"
import { OrderDish } from "./entities/order-dish.entity"
import { EventsGateway } from "../events/events.gateway"

export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROCESS = "IN_PROCESS",
  FINISHED = "FINISHED",
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(OrderDish)
    private readonly orderDishesRepository: Repository<OrderDish>,
    private readonly eventsGateway: EventsGateway,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { tableId, dishes: dishesFromDto } = createOrderDto
    const table = await this.tableRepository.findOne({
      where: {
        id: tableId,
      },
    })
    const order = new Order(OrderStatus.PENDING, table)
    await this.orderRepository.save(order)

    const dishesToInsert = []
    for (const dish of dishesFromDto) {
      dishesToInsert.push({
        orderId: order.id,
        dishId: dish.dishId,
        quantityPerOrder: dish.quantityPerOrder,
      })
    }

    await this.orderDishesRepository.save(dishesToInsert)

    const completeOrder = await this.findOne(order.id)
    this.eventsGateway.sendNewResourceMessage("order", completeOrder)
    return completeOrder
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: { table: true, orderDishes: { dish: true } },
    })
    for (let i = 0; i < orders.length; i++) {
      orders[i].orderDishes = this.formatOrderDishes(orders[i].orderDishes)
    }
    return orders
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneOrFail({
      where: { id },
      relations: { table: true, orderDishes: { dish: true } },
    })
    order.orderDishes ? order.orderDishes = this.formatOrderDishes(order.orderDishes) : order.orderDishes = []
    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto)
  }

  async remove(id: string) {
    return await this.orderRepository.delete(id)
  }

  formatOrderDishes(orderDishes: OrderDish[]) {
    const dishes = []
    for (const orderDish of orderDishes) {
      const { id, dish, quantityPerOrder } = orderDish
      dishes.push({ id, dish, quantityPerOrder })
    }
    return dishes
  }
}
