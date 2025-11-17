import { Exclude } from 'class-transformer';

export class ProjectResponseDto {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  
  @Exclude()
  createdBy: any;
}