import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from "class-validator"
import { minNameLength, maxNameLength } from "../../contants"

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(minNameLength, {
    message: `Name must have atleast ${minNameLength} characters`,
  })
  @MaxLength(maxNameLength, {
    message: `Name must be equal or lower than ${maxNameLength} characters`,
  })
  name: string

  @IsNumber()
  quantity?: number
}
