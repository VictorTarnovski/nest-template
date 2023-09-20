import { maxNameLength } from "../../contants"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { DishIngredient } from "./dish-ingredient.entity"
import { OrderDish } from "../../orders/entities/order-dish.entity"

@Entity("dishes")
export class Dish {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: maxNameLength, nullable: false })
  name: string

  @Column({ type: "bigint", nullable: false })
  price: number

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.dish)
  dishIngredients: DishIngredient[]

  @OneToMany(() => OrderDish, (orderDish) => orderDish.dish)
  orderDishes: OrderDish[]
}
