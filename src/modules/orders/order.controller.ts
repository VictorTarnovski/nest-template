import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from "@nestjs/common"
import { OrderService, OrderStatus } from "./order.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { DishesService } from "../dishes/dishes.service"
import { TableService } from "../tables/table.service"

@Controller("orders")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly dishesService: DishesService,
    private readonly tableService: TableService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const { tableId, dishes } = createOrderDto
    const foundTable = await this.tableService.findOne(tableId)
    if (!foundTable) {
      throw new NotFoundException(`Could not find Table: ${tableId}`)
    }
    for (const dish of dishes) {
      const foundDish = await this.dishesService.findOne(dish.dishId)
      if (!foundDish) {
        throw new NotFoundException(`Could not find Dish: ${dish.dishId}`)
      }
    }
    return this.orderService.create(createOrderDto)
  }

  @Get()
  async findAll() {
    return this.orderService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const order = await this.orderService.findOne(id)
    if (!order) {
      throw new NotFoundException(`Could not find Order: ${id}`)
    }
    return order
  }

  @Post(":id/start-process")
  @HttpCode(204)
  async startProcess(@Param("id") id: string) {
    return await this.update(id, { status: OrderStatus.IN_PROCESS })
  }

  @Post(":id/finish")
  @HttpCode(204)
  async finish(@Param("id") id: string) {
    return await this.update(id, { status: OrderStatus.FINISHED })
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.orderService.findOne(id)
    if (!order) {
      throw new NotFoundException(`Could not find Order: ${id}`)
    } else {
      return this.orderService.update(id, updateOrderDto)
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.orderService.remove(id)
  }
}
