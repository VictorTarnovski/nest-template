import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { maxNameLength } from "../../contants"

export class CreateTableDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(maxNameLength, {
    message: `Name must be equal or lower than ${maxNameLength} characters`,
  })
  name: string
}
