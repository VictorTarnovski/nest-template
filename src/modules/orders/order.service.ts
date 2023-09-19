import { Injectable } from "@nestjs/common"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    return createOrderDto
  }

  findAll() {
    return `This action returns all order`
  }

  findOne(id: string) {
    return `This action returns a #${id} order`
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return updateOrderDto
  }

  remove(id: string) {
    return `This action removes a #${id} order`
  }
}
