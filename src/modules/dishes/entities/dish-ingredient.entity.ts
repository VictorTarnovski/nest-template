import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Dish } from "./dish.entity"
import { Ingredient } from "../../ingredients/entities/ingredient.entity"

@Entity("dish_ingredients")
export class DishIngredient {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false })
  dishId: string

  @Column({ nullable: false })
  ingredientId: string

  @Column({ nullable: false })
  quantityPerDish: number

  @ManyToOne(() => Dish, (dish) => dish.dishIngredients)
  dish: Dish

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.dishIngredients)
  ingredient: Ingredient
}
