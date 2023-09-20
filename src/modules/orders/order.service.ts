import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Order } from "./entities/order.entity"
import { Table } from "../tables/entities/table.entity"
import { OrderDish } from "./entities/order-dish.entity"

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
  ) {}

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

    const completeOrder = this.findOne(order.id)
    return completeOrder
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: { orderDishes: true },
    })
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { orderDishes: true },
    })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto)
  }

  async remove(id: string) {
    return await this.orderRepository.delete(id)
  }
}
