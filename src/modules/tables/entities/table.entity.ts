import { Order } from "../../orders/entities/order.entity"
import { maxNameLength } from "../../contants"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity("tables")
export class Table {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: maxNameLength, nullable: false })
  name: string

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[]
}
