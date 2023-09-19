import {
  Controller,
  Body,
  Get,
  Post,
  NotFoundException,
  Param,
} from "@nestjs/common"
import { IngredientsService } from "../ingredients/ingredients.service"
import { DishesService } from "./dishes.service"
import { CreateDishtDto } from "./dto/create-dish.dto"

@Controller("dishes")
export class DishesController {
  constructor(
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
  ) {}

  @Post()
  async create(@Body() createDishtDto: CreateDishtDto) {
    const ingredientsToSave = []
    const { name, price, ingredients } = createDishtDto

    for (const ingredient of ingredients) {
      const foundIngredient = await this.ingredientsService.findOne(
        ingredient.ingredientId,
      )

      if (!foundIngredient) {
        throw new NotFoundException(
          `Could not find Ingredient: ${ingredient.ingredientId}`,
        )
      } else {
        ingredientsToSave.push(ingredient)
      }
    }

    const dish = await this.dishesService.create({
      name,
      price,
      ingredients,
    })

    return dish
  }

  @Get()
  async findAll() {
    return this.dishesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dishesService.findOne(id)
  }
}
