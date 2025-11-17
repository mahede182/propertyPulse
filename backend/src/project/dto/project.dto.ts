import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class ProjectsDto extends AbstractDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  createdById: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}