import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DishesController } from "./dishes.controller"
import { DishesService } from "./dishes.service"
import { Dish } from "./entities/dish.entity"
import { IngredientsModule } from "../ingredients/ingredients.module"
import { DishIngredient } from "./entities/dish-ingredients.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish]),
    TypeOrmModule.forFeature([DishIngredient]),
    IngredientsModule,
  ],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService],
})
export class DishesModule {}
