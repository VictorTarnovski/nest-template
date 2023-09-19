import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Ingredient as IngredientEntity } from "./entities/ingredient.entity"
import { CreateIngredientDto } from "./dto/create-ingredient.dto"

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientsRepository: Repository<IngredientEntity>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { name, quantity } = createIngredientDto
    const ingredient = this.ingredientsRepository.save({
      name,
      quantity: quantity ? quantity : 0,
    })
    return ingredient
  }

  async findOne(id: string) {
    return this.ingredientsRepository.findOneBy({ id })
  }

  async findAll() {
    return this.ingredientsRepository.find()
  }
}
