import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"
import { Dish } from "../../dishes/entities/dish.entity"

@Entity("order_dishes")
export class OrderDish {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false })
  orderId: string

  @Column({ nullable: false })
  dishId: string

  @Column({ nullable: false })
  quantityPerOrder: number

  @ManyToOne(() => Order, (order) => order.orderDishes)
  order: Order

  @ManyToOne(() => Dish, (dish) => dish.orderDishes)
  dish: Dish
}
