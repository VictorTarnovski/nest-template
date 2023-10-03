import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Dish as DishEntity } from "./entities/dish.entity"
import { DishIngredient as DishIngredientEntity } from "./entities/dish-ingredient.entity"
import { CreateDishtDto } from "./dto/create-dish.dto"
import { EventsGateway } from "../events/events.gateway"

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishEntity)
    private readonly dishesRepository: Repository<DishEntity>,
    @InjectRepository(DishIngredientEntity)
    private readonly dishIngredientsRepository: Repository<DishIngredientEntity>,
    private readonly eventsGateway: EventsGateway,
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
    const dish = await this.findOne(dishWithoutIngredients.id)
    this.eventsGateway.sendNewResourceMessage("dish", dish)
    return dish
  }

  async findOne(dishId: string) {
    const { id, name, price, dishIngredients } =
      await this.dishesRepository.findOne({
        where: {
          id: dishId,
        },
        relations: {
          dishIngredients: {
            ingredient: true,
          },
        },
      })
    return {
      id,
      name,
      price,
      dishIngredients: this.formatDishIngredients(dishIngredients),
    }
  }

  async findAll() {
    return this.dishesRepository.find({
      loadRelationIds: {
        relations: ["dishIngredients"],
      },
    })
  }

  formatDishIngredients(dishIngredients: DishIngredientEntity[]) {
    const ingredients = []
    for (const dishIngredient of dishIngredients) {
      const { id, ingredient, quantityPerDish } = dishIngredient
      ingredients.push({ id, ingredient, quantityPerDish })
    }
    return ingredients
  }
}
