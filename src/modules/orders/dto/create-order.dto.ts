import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUUID,
} from "class-validator"
import { Type } from "class-transformer"

class OrderDish {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  dishId: string

  @IsNumber()
  quantityPerOrder: number
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tableId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDish)
  dishes: OrderDish[]
}
