import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"
import { minNameLength, maxNameLength } from "../../contants"

class DishIngredient {
  ingredientId: string
  quantityPerDish: number
}

export class CreateDishtDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(minNameLength, {
    message: `Name must have atleast ${minNameLength} characters`,
  })
  @MaxLength(maxNameLength, {
    message: `Name must be equal or lower than ${maxNameLength} characters`,
  })
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DishIngredient)
  ingredients: DishIngredient[]
}
