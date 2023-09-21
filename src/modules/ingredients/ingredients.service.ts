import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Ingredient as IngredientEntity } from "./entities/ingredient.entity"
import { CreateIngredientDto } from "./dto/create-ingredient.dto"
import { EventsGateway } from "../events/events.gateway"

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientsRepository: Repository<IngredientEntity>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { name, quantity } = createIngredientDto
    const ingredient = await this.ingredientsRepository.save({
      name,
      quantity: quantity ? quantity : 0,
    })
    this.eventsGateway.sendNewResourceMessage("ingredient", ingredient)
    return ingredient
  }

  async findOne(id: string) {
    return this.ingredientsRepository.findOneBy({ id })
  }

  async findAll() {
    return this.ingredientsRepository.find()
  }
}
