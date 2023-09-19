import { DishesModule } from "./modules/dishes/dishes.module"
import { IngredientsModule } from "./modules/ingredients/ingredients.module"
import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "./modules/dishes/entities/dish.entity"
import { Ingredient } from "./modules/ingredients/entities/ingredient.entity"
import { DishIngredient } from "./modules/dishes/entities/dish-ingredients.entity"
import { TableModule } from "./modules/tables/table.module"
import { Table } from "./modules/tables/entities/table.entity"
import { OrderModule } from "./modules/orders/order.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      entities: [Dish, Ingredient, DishIngredient, Table],
      database: "nest_template.db",
      synchronize: true,
    }),
    DishesModule,
    IngredientsModule,
    TableModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
