import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Dish as DishEntity } from "./entities/dish.entity"
import { DishIngredient as DishIngredientEntity } from "./entities/dish-ingredients.entity"
import { CreateDishtDto } from "./dto/create-dish.dto"

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishEntity)
    private readonly dishesRepository: Repository<DishEntity>,
    @InjectRepository(DishIngredientEntity)
    private readonly dishIngredientsRepository: Repository<DishIngredientEntity>,
  ) {}

  async create(createDishtDto: CreateDishtDto) {
    const {
      name: dishName,
      price: dishPrice,
      ingredients: ingredientsFromDto,
    } = createDishtDto

    const dishWithoutIngredients = await this.dishesRepository.save({
      name: dishName,
      price: dishPrice,
    })

    const ingredientsToInsert = []
    for (const ingredient of ingredientsFromDto) {
      ingredientsToInsert.push({
        dishId: dishWithoutIngredients.id,
        ingredientId: ingredient.ingredientId,
        quantityPerDish: ingredient.quantityPerDish,
      })
    }
    await this.dishIngredientsRepository.save(ingredientsToInsert)
    const dish = await this.dishesRepository.findOne({
      where: {
        id: dishWithoutIngredients.id,
      },
      relations: {
        dishIngredients: true,
      },
    })
    return dish
  }

  async findOne(id: string) {
    return await this.dishesRepository.findOne({
      where: {
        id,
      },
      relations: {
        dishIngredients: true,
      },
    })
  }

  async findAll() {
    return this.dishesRepository.find({
      relations: {
        dishIngredients: true,
      },
    })
  }
}
