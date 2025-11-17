import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty({ message: "title is required" })
  name: string;

  @IsNotEmpty({ message: "content is required" })
  description: string;

  @IsNotEmpty({ message: "authorEmail is required" })
  createdBy: string;
}
