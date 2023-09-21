import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { IngredientsController } from "./ingredients.controller"
import { IngredientsService } from "./ingredients.service"
import { Ingredient } from "./entities/ingredient.entity"
import { EventsModule } from "../events/events.module"

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient]), EventsModule],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
