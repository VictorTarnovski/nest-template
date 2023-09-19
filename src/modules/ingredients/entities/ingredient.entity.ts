import { maxNameLength } from "../../contants"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { DishIngredient } from "src/modules/dishes/entities/dish-ingredients.entity"

@Entity("ingredients")
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: maxNameLength, nullable: false })
  name: string

  @Column({ default: 0 })
  quantity: number

  @OneToMany(
    () => DishIngredient,
    (dishIngredient) => dishIngredient.ingredient,
  )
  dishIngredients: DishIngredient[]
}
