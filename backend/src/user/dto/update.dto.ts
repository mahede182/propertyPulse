import { PartialType } from "@nestjs/mapped-types";
import { IsDefined, IsString } from "class-validator";
import { CreateUserDto } from "./create.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsDefined()
  @IsString()
  readonly id: string;
}
