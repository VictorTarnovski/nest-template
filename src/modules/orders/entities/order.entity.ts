import { Table } from "../../tables/entities/table.entity"
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm"
import { OrderDish } from "./order-dish.entity"

@Entity("orders")
export class Order {
  constructor(status: string, table: Table) {
    this.status = status
    this.table = table
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  status: string

  @OneToMany(() => OrderDish, (orderDish) => orderDish.order)
  orderDishes: OrderDish[]

  @ManyToOne(() => Table, (table) => table.orders)
  table: Table
}
