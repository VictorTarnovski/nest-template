import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DishesController } from "./dishes.controller"
import { DishesService } from "./dishes.service"
import { Dish } from "./entities/dish.entity"
import { IngredientsModule } from "../ingredients/ingredients.module"
import { DishIngredient } from "./entities/dish-ingredient.entity"
import { EventsModule } from "../events/events.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish, DishIngredient]),
    IngredientsModule,
    EventsModule,
  ],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService],
})
export class DishesModule {}
