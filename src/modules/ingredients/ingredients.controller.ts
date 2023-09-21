import { Controller, Body, Get, Post, Param } from "@nestjs/common"
import { CreateIngredientDto } from "./dto/create-ingredient.dto"
import { IngredientsService } from "./ingredients.service"

@Controller("ingredients")
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    const { name, quantity } = createIngredientDto
    const ingredient = await this.ingredientsService.create({
      name,
      quantity: quantity ? quantity : 0,
    })
    return ingredient
  }

  @Get()
  async findAll() {
    return this.ingredientsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ingredientsService.findOne(id)
  }
}
