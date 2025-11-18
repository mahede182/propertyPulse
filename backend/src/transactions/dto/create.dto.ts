import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}