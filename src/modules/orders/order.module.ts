import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderService } from "./order.service"
import { OrderController } from "./order.controller"
import { Order } from "./entities/order.entity"
import { DishesModule } from "../dishes/dishes.module"
import { TableModule } from "../tables/table.module"
import { Table } from "../tables/entities/table.entity"
import { OrderDish } from "./entities/order-dish.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Table, OrderDish]),
    DishesModule,
    TableModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
