import { IsEnum, IsString } from "class-validator"
import { OrderStatus } from "../order.service"
export class UpdateOrderDto {
  @IsString()
  @IsEnum(OrderStatus)
  status: string
}
